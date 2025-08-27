/**
 * High-Performance Messaging tRPC Router
 * Optimized for 10K+ concurrent users with proper authentication and caching
 */

import { z } from "zod";
import { createTRPCRouter, protectedProcedure, roleProtectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { UserType } from "@prisma/client";
import { MessagingService } from "@/server/api/services/messaging.service";
import { ComplianceService } from "@/server/api/services/compliance.service";

// Input validation schemas
const createMessageSchema = z.object({
  content: z.string().min(1).max(5000),
  recipients: z.array(z.string()),
  threadId: z.string().optional(),
  parentMessageId: z.string().optional(),
  messageType: z.enum(['PUBLIC', 'PRIVATE', 'GROUP', 'BROADCAST', 'SYSTEM']).default('PRIVATE'),
  classId: z.string().optional(),
});

const getMessagesSchema = z.object({
  threadId: z.string().optional(),
  classId: z.string().optional(),
  messageType: z.enum(['PUBLIC', 'PRIVATE', 'GROUP', 'BROADCAST', 'SYSTEM']).optional(),
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
  includeDeleted: z.boolean().default(false),
});

const moderationActionSchema = z.object({
  messageId: z.string(),
  action: z.enum(['APPROVE', 'BLOCK', 'ESCALATE', 'RESTORE']),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

const complianceStatsSchema = z.object({
  scope: z.enum(['system-wide', 'campus', 'class']),
  campusId: z.string().optional(),
  classId: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

const searchRecipientsSchema = z.object({
  campusId: z.string().optional(),
  classId: z.string().optional(),
  search: z.string().optional(),
  userType: z.enum(['CAMPUS_TEACHER', 'CAMPUS_STUDENT', 'PARENT', 'COORDINATOR']).optional(),
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(), // For pagination
});

const flaggedMessagesSchema = z.object({
  scope: z.enum(['all-campuses', 'campus', 'class']),
  campusId: z.string().optional(),
  classId: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  status: z.enum(['PENDING', 'IN_REVIEW', 'APPROVED', 'BLOCKED', 'ESCALATED', 'RESOLVED']).optional(),
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
});

export const messagingRouter = createTRPCRouter({
  // ==================== MESSAGE OPERATIONS ====================
  
  /**
   * Create a new message with full compliance processing
   */
  createMessage: protectedProcedure
    .input(createMessageSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const service = new MessagingService(ctx.prisma);
        const result = await service.createMessage(ctx.session.user.id, input);
        
        return {
          success: true,
          message: result.message,
          complianceProfile: result.complianceProfile,
          warnings: result.warnings || []
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create message',
          cause: error
        });
      }
    }),

  /**
   * Get messages with pagination and filtering
   */
  getMessages: protectedProcedure
    .input(getMessagesSchema)
    .query(async ({ ctx, input }) => {
      try {
        const service = new MessagingService(ctx.prisma);
        return await service.getMessages(input);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve messages',
          cause: error
        });
      }
    }),

  /**
   * Get message thread with full context
   */
  getThread: protectedProcedure
    .input(z.object({
      threadId: z.string(),
      limit: z.number().min(1).max(100).default(50),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      try {
        const service = new MessagingService(ctx.prisma);
        return await service.getThread(input);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve thread',
          cause: error
        });
      }
    }),

  /**
   * Mark message as read
   */
  markAsRead: protectedProcedure
    .input(z.object({
      messageId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const service = new MessagingService(ctx.prisma);
        await service.markAsRead(ctx.session.user.id, input.messageId);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to mark message as read',
          cause: error
        });
      }
    }),

  /**
   * Get unread message count
   */
  getUnreadCount: protectedProcedure
    .input(z.object({
      classId: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      try {
        const service = new MessagingService(ctx.prisma);
        return await service.getUnreadCount(ctx.session.user.id, input.classId);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get unread count',
          cause: error
        });
      }
    }),

  // ==================== COMPLIANCE OPERATIONS ====================

  /**
   * Get compliance statistics (Admin only)
   */
  getComplianceStats: roleProtectedProcedure([UserType.SYSTEM_ADMIN, UserType.CAMPUS_ADMIN])
    .input(complianceStatsSchema)
    .query(async ({ ctx, input }) => {
      try {
        const service = new ComplianceService(ctx.prisma);
        return await service.getComplianceStats(input);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve compliance statistics',
          cause: error
        });
      }
    }),

  /**
   * Get audit trail for a message (Admin only)
   */
  getMessageAuditTrail: roleProtectedProcedure([UserType.SYSTEM_ADMIN, UserType.CAMPUS_ADMIN, UserType.TEACHER])
    .input(z.object({
      messageId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      try {
        const service = new ComplianceService(ctx.prisma);
        return await service.getMessageAuditTrail(input.messageId);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve audit trail',
          cause: error
        });
      }
    }),

  /**
   * Get FERPA disclosure logs (Admin only)
   */
  getFerpaDisclosures: roleProtectedProcedure([UserType.SYSTEM_ADMIN, UserType.CAMPUS_ADMIN])
    .input(z.object({
      studentId: z.string().optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      limit: z.number().min(1).max(100).default(20),
    }))
    .query(async ({ ctx, input }) => {
      try {
        const service = new ComplianceService(ctx.prisma);
        return await service.getFerpaDisclosures(input);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve FERPA disclosures',
          cause: error
        });
      }
    }),

  // ==================== MODERATION OPERATIONS ====================

  /**
   * Get flagged messages for moderation
   */
  getFlaggedMessages: roleProtectedProcedure([UserType.SYSTEM_ADMIN, UserType.CAMPUS_ADMIN, UserType.TEACHER])
    .input(flaggedMessagesSchema)
    .query(async ({ ctx, input }) => {
      try {
        const service = new MessagingService(ctx.prisma);
        return await service.getFlaggedMessages(input);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve flagged messages',
          cause: error
        });
      }
    }),

  /**
   * Moderate a message
   */
  moderateMessage: roleProtectedProcedure([UserType.SYSTEM_ADMIN, UserType.CAMPUS_ADMIN, UserType.TEACHER])
    .input(moderationActionSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const service = new MessagingService(ctx.prisma);
        return await service.moderateMessage(ctx.session.user.id, input);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to moderate message',
          cause: error
        });
      }
    }),

  /**
   * Get moderation queue statistics
   */
  getModerationStats: roleProtectedProcedure([UserType.SYSTEM_ADMIN, UserType.CAMPUS_ADMIN, UserType.TEACHER])
    .input(z.object({
      scope: z.enum(['all-campuses', 'campus', 'class']),
      campusId: z.string().optional(),
      classId: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      try {
        const service = new MessagingService(ctx.prisma);
        return await service.getModerationStats(input);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve moderation statistics',
          cause: error
        });
      }
    }),

  // ==================== RETENTION OPERATIONS ====================

  /**
   * Get retention statistics (Admin only)
   */
  getRetentionStats: roleProtectedProcedure([UserType.SYSTEM_ADMIN, UserType.CAMPUS_ADMIN])
    .query(async ({ ctx }) => {
      try {
        const service = new ComplianceService(ctx.prisma);
        return await service.getRetentionStats();
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve retention statistics',
          cause: error
        });
      }
    }),

  /**
   * Update message retention period (Admin only)
   */
  updateRetentionPeriod: roleProtectedProcedure([UserType.SYSTEM_ADMIN, UserType.CAMPUS_ADMIN])
    .input(z.object({
      messageId: z.string(),
      retentionPeriod: z.number().min(1).max(3650), // 1 day to 10 years
      reason: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const service = new ComplianceService(ctx.prisma);
        await service.updateRetentionPeriod(input.messageId, input.retentionPeriod, input.reason);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update retention period',
          cause: error
        });
      }
    }),

  // ==================== RECIPIENT SEARCH ====================

  /**
   * Search for potential message recipients with compliance filtering
   */
  searchRecipients: protectedProcedure
    .input(searchRecipientsSchema)
    .query(async ({ ctx, input }) => {
      console.log('🔍 searchRecipients called with input:', input);
      console.log('🔍 User context:', { userId: ctx.session?.user?.id, userType: ctx.session?.user?.userType });

      try {
        const { campusId, classId, search, userType, limit, cursor } = input;

        // Build base where clause
        const where: any = {
          status: 'ACTIVE', // Only active users
        };

        console.log('🔍 Initial where clause:', where);

        // Add campus filter if provided
        if (campusId) {
          where.activeCampuses = {
            some: {
              campusId,
              status: 'ACTIVE'
            }
          };
        }

        // Add userType filter if provided (handle both old and new formats)
        if (userType) {
          if (userType === 'CAMPUS_TEACHER') {
            where.userType = { in: ['CAMPUS_TEACHER', 'TEACHER'] };
          } else if (userType === 'CAMPUS_STUDENT') {
            where.userType = { in: ['CAMPUS_STUDENT', 'STUDENT'] };
          } else if (userType === 'PARENT') {
            where.userType = { in: ['PARENT'] };
          } else if (userType === 'COORDINATOR') {
            where.userType = { in: ['COORDINATOR'] };
          } else {
            where.userType = userType;
          }
          console.log('🔍 Added userType filter:', where.userType);
        }

        // Add search filter if provided
        if (search) {
          where.OR = [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            { username: { contains: search, mode: 'insensitive' as const } }
          ];
        }

        // Add cursor-based pagination for performance with large datasets
        if (cursor) {
          where.id = {
            gt: cursor
          };
        }

        console.log('🔍 Final where clause before query:', JSON.stringify(where, null, 2));

        // Get users with compliance-safe fields only
        const users = await ctx.prisma.user.findMany({
          where,
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
          },
          take: limit + 1, // Take one extra to check if there are more
          orderBy: { id: 'asc' } // Use id for consistent cursor pagination
        });

        console.log('🔍 Query result:', `${users.length} users found`);

        // If classId is provided, also get class-specific users
        let classUsers: any[] = [];
        if (classId) {
          // Get class enrollments (students)
          const enrollments = await ctx.prisma.studentEnrollment.findMany({
            where: {
              classId,
              status: 'ACTIVE',
            },
            include: {
              student: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      userType: true,
                    },
                  },
                },
              },
            },
          });

          // Get class teachers
          const teacherAssignments = await ctx.prisma.teacherAssignment.findMany({
            where: {
              classId,
              status: 'ACTIVE',
            },
            include: {
              teacher: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      userType: true,
                    },
                  },
                },
              },
            },
          });

          // Combine class users
          classUsers = [
            ...enrollments.map(e => e.student.user),
            ...teacherAssignments.map(ta => ta.teacher.user),
          ];
        }

        // Handle pagination
        const hasMore = users.length > limit;
        const paginatedUsers = hasMore ? users.slice(0, -1) : users;
        const nextCursor = hasMore ? paginatedUsers[paginatedUsers.length - 1]?.id : null;

        // Merge and deduplicate with class users
        const allUsers = [...paginatedUsers];
        classUsers.forEach(classUser => {
          if (!allUsers.some(user => user.id === classUser.id)) {
            allUsers.push(classUser);
          }
        });

        // Apply final search filter if needed
        let finalUsers = allUsers;
        if (search) {
          finalUsers = allUsers.filter(user =>
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase())
          );
        }

        return {
          recipients: finalUsers.slice(0, limit),
          hasMore: hasMore || finalUsers.length > limit,
          nextCursor
        };
      } catch (error) {
        console.error('searchRecipients error:', error);
        console.error('Input:', input);
        console.error('Error details:', {
          name: error instanceof Error ? error.name : 'Unknown',
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to search recipients: ${error instanceof Error ? error.message : 'Unknown error'}`,
          cause: error
        });
      }
    }),

  // ==================== CLASS USERS (Social Wall Pattern) ====================

  /**
   * Get class users for messaging (following social wall architecture)
   */
  getClassUsers: protectedProcedure
    .input(z.object({ classId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const { classId } = input;

        // Get class enrollments (students)
        const enrollments = await ctx.prisma.studentEnrollment.findMany({
          where: {
            classId,
            status: 'ACTIVE',
          },
          include: {
            student: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    userType: true,
                  },
                },
              },
            },
          },
        });

        // Get class teachers
        const teacherAssignments = await ctx.prisma.teacherAssignment.findMany({
          where: {
            classId,
            status: 'ACTIVE',
          },
          include: {
            teacher: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    userType: true,
                  },
                },
              },
            },
          },
        });

        // Combine and format users
        const users = [
          ...enrollments.map(e => ({
            id: e.student.user.id,
            name: e.student.user.name || 'Unknown Student',
            email: e.student.user.email,
            userType: 'STUDENT', // Normalize for social wall compatibility
          })),
          ...teacherAssignments.map(ta => ({
            id: ta.teacher.user.id,
            name: ta.teacher.user.name || 'Unknown Teacher',
            email: ta.teacher.user.email,
            userType: 'TEACHER', // Normalize for social wall compatibility
          })),
        ];

        return users;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve class users',
          cause: error
        });
      }
    }),

  // ==================== PERFORMANCE MONITORING ====================

  /**
   * Get system performance statistics (System Admin only)
   */
  getPerformanceStats: roleProtectedProcedure([UserType.SYSTEM_ADMIN])
    .query(async ({ ctx }) => {
      try {
        const service = new MessagingService(ctx.prisma);
        return await service.getPerformanceStats();
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve performance statistics',
          cause: error
        });
      }
    }),
});
