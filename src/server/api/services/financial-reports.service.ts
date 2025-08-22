import { prisma } from "@/server/db";
import { z } from "zod";

export const financialReportFiltersSchema = z.object({
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  campusId: z.string().optional(),
  programId: z.string().optional(),
  classId: z.string().optional(),
  studentId: z.string().optional(),
});

export type FinancialReportFilters = z.infer<typeof financialReportFiltersSchema>;

export class FinancialReportsService {
  private prisma: typeof prisma;

  constructor(options: { prisma: typeof prisma }) {
    this.prisma = options.prisma;
  }

  /**
   * Get institution-level financial report
   */
  async getInstitutionReport(filters: FinancialReportFilters = {}) {
    const whereClause = this.buildWhereClause(filters);

    const [
      totalCollected,
      totalPending,
      totalOverdue,
      studentCount,
      campusCount,
      programCount,
      feeStructureCount,
      discountTypeCount,
    ] = await Promise.all([
      // Total collected amount
      this.prisma.feeTransaction.aggregate({
        where: {
          ...whereClause.transaction,
          date: {
            gte: filters.dateFrom,
            lte: filters.dateTo,
          },
        },
        _sum: { amount: true },
      }),

      // Total pending fees
      this.prisma.enrollmentFee.aggregate({
        where: {
          ...whereClause.enrollmentFee,
          paymentStatus: { in: ["PENDING", "PARTIAL"] },
        },
        _sum: { finalAmount: true },
      }),

      // Overdue fees
      this.prisma.enrollmentFee.findMany({
        where: {
          ...whereClause.enrollmentFee,
          paymentStatus: { in: ["PENDING", "PARTIAL"] },
          dueDate: { lt: new Date() },
        },
        include: { transactions: true },
      }),

      // Student count
      this.prisma.studentProfile.count({
        where: whereClause.student,
      }),

      // Campus count
      this.prisma.campus.count(),

      // Program count
      this.prisma.program.count(),

      // Fee structure count
      this.prisma.feeStructure.count({
        where: { status: "ACTIVE" },
      }),

      // Discount type count
      this.prisma.discountType.count({
        where: { status: "ACTIVE" },
      }),
    ]);

    // Calculate overdue amount
    const overdueAmount = totalOverdue.reduce((sum, fee) => {
      const paidAmount = fee.transactions.reduce((paid, t) => paid + t.amount, 0);
      return sum + Math.max(0, fee.finalAmount - paidAmount);
    }, 0);

    return {
      totalCollected: totalCollected._sum.amount || 0,
      totalPending: totalPending._sum.finalAmount || 0,
      totalOverdue: overdueAmount,
      studentCount,
      campusCount,
      programCount,
      feeStructureCount,
      discountTypeCount,
      collectionRate: this.calculateCollectionRate(
        totalCollected._sum.amount || 0,
        totalPending._sum.finalAmount || 0
      ),
    };
  }

  /**
   * Get campus-wise financial report
   */
  async getCampusReport(filters: FinancialReportFilters = {}) {
    const campuses = await this.prisma.campus.findMany({
      where: filters.campusId ? { id: filters.campusId } : {},
      include: {
        classes: {
          include: {
            students: {
              include: {
                fee: {
                  include: { transactions: true },
                },
              },
            },
          },
        },
      },
    });

    return campuses.map((campus) => {
      let totalCollected = 0;
      let totalPending = 0;
      let studentCount = 0;

      campus.classes.forEach((classItem) => {
        classItem.students.forEach((enrollment) => {
          studentCount++;
          if (enrollment.fee) {
            const paidAmount = enrollment.fee.transactions.reduce((sum, t) => sum + t.amount, 0);
            totalCollected += paidAmount;
            totalPending += Math.max(0, enrollment.fee.finalAmount - paidAmount);
          }
        });
      });

      return {
        campusId: campus.id,
        campusName: campus.name,
        totalCollected,
        totalPending,
        studentCount,
        collectionRate: this.calculateCollectionRate(totalCollected, totalPending),
      };
    });
  }

  /**
   * Get program-wise financial report
   */
  async getProgramReport(filters: FinancialReportFilters = {}) {
    const programs = await this.prisma.program.findMany({
      where: filters.programId ? { id: filters.programId } : {},
      include: {
        campusOfferings: {
          include: {
            classes: {
              include: {
                students: {
                  include: {
                    fee: {
                      include: { transactions: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return programs.map((program) => {
      let totalCollected = 0;
      let totalPending = 0;
      let studentCount = 0;

      program.campusOfferings.forEach((programCampus) => {
        programCampus.classes.forEach((classItem) => {
          classItem.students.forEach((enrollment) => {
            studentCount++;
            if (enrollment.fee) {
              const paidAmount = enrollment.fee.transactions.reduce((sum, t) => sum + t.amount, 0);
              totalCollected += paidAmount;
              totalPending += Math.max(0, enrollment.fee.finalAmount - paidAmount);
            }
          });
        });
      });

      return {
        programId: program.id,
        programName: program.name,
        programType: program.type,
        totalCollected,
        totalPending,
        studentCount,
        collectionRate: this.calculateCollectionRate(totalCollected, totalPending),
      };
    });
  }

  /**
   * Get class-wise financial report
   */
  async getClassReport(filters: FinancialReportFilters = {}) {
    const classes = await this.prisma.class.findMany({
      where: filters.classId ? { id: filters.classId } : {},
      include: {
        courseCampus: {
          include: {
            course: { include: { program: true } },
            campus: true,
          },
        },
        students: {
          include: {
            student: true,
            fee: {
              include: { transactions: true },
            },
          },
        },
      },
    });

    return classes.map((classItem) => {
      let totalCollected = 0;
      let totalPending = 0;
      const studentCount = classItem.students.length;

      classItem.students.forEach((enrollment) => {
        if (enrollment.fee) {
          const paidAmount = enrollment.fee.transactions.reduce((sum, t) => sum + t.amount, 0);
          totalCollected += paidAmount;
          totalPending += Math.max(0, enrollment.fee.finalAmount - paidAmount);
        }
      });

      return {
        classId: classItem.id,
        className: classItem.name,
        programName: classItem.courseCampus.course.program.name,
        campusName: classItem.courseCampus.campus.name,
        totalCollected,
        totalPending,
        studentCount,
        collectionRate: this.calculateCollectionRate(totalCollected, totalPending),
      };
    });
  }

  /**
   * Get student-wise financial report
   */
  async getStudentReport(filters: FinancialReportFilters = {}) {
    const students = await this.prisma.studentProfile.findMany({
      where: {
        ...(filters.studentId && { id: filters.studentId }),
        ...(filters.campusId && {
          enrollments: {
            some: {
              class: {
                campusId: filters.campusId,
              },
            },
          },
        }),
      },
      include: {
        user: true,
        enrollments: {
          include: {
            class: {
              include: {
                courseCampus: {
                  include: {
                    course: { include: { program: true } },
                    campus: true,
                  },
                },
              },
            },
            fee: {
              include: { transactions: true },
            },
          },
        },
      },
    });

    return students.map((student) => {
      let totalCollected = 0;
      let totalPending = 0;
      let totalOverdue = 0;

      student.enrollments.forEach((enrollment) => {
        if (enrollment.fee) {
          const fee = enrollment.fee;
          const paidAmount = fee.transactions.reduce((sum: number, t) => sum + t.amount, 0);
          totalCollected += paidAmount;
          const pendingAmount = Math.max(0, fee.finalAmount - paidAmount);
          totalPending += pendingAmount;

          if (fee.dueDate && fee.dueDate < new Date() && pendingAmount > 0) {
            totalOverdue += pendingAmount;
          }
        }
      });

      return {
        studentId: student.id,
        studentName: student.user.name || 'Unknown',
        studentEmail: student.user.email || 'No email',
        totalCollected,
        totalPending,
        totalOverdue,
        paymentStatus: totalPending === 0 ? "PAID" : totalOverdue > 0 ? "OVERDUE" : "PENDING",
        enrollmentCount: student.enrollments.length,
      };
    });
  }

  /**
   * Build where clause for filtering
   */
  private buildWhereClause(filters: FinancialReportFilters) {
    const baseWhere: any = {};

    if (filters.campusId) {
      baseWhere.enrollment = {
        class: {
          campusId: filters.campusId,
        },
      };
    }

    if (filters.programId) {
      baseWhere.enrollment = {
        ...baseWhere.enrollment,
        class: {
          ...baseWhere.enrollment?.class,
          courseCampus: {
            course: {
              programId: filters.programId,
            },
          },
        },
      };
    }

    return {
      transaction: {
        enrollmentFee: baseWhere,
      },
      enrollmentFee: baseWhere,
      student: filters.campusId
        ? {
            enrollments: {
              some: {
                class: {
                  campusId: filters.campusId,
                },
              },
            },
          }
        : {},
    };
  }

  /**
   * Calculate collection rate
   */
  private calculateCollectionRate(collected: number, pending: number): number {
    const total = collected + pending;
    return total > 0 ? (collected / total) * 100 : 0;
  }
}
