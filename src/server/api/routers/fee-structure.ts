import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { FeeService, createFeeStructureSchema, updateFeeStructureSchema } from "../services/fee.service";

export const feeStructureRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({
      campusId: z.string().optional(),
      programId: z.string().optional(),
      academicCycleId: z.string().optional(),
      status: z.string().optional(),
    }).optional())
    .meta({
      performance: {
        cache: true,
        cacheTTL: 300, // 5 minutes
        slowQueryThreshold: 2000
      }
    })
    .query(async ({ ctx, input }) => {
      const feeService = new FeeService({ prisma: ctx.prisma });
      return feeService.getAllFeeStructures(input || {});
    }),

  create: protectedProcedure
    .input(createFeeStructureSchema)
    .mutation(async ({ ctx, input }) => {
      const feeService = new FeeService({ prisma: ctx.prisma });
      return feeService.createFeeStructure({
        ...input,
        createdById: ctx.session.user.id,
      });
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const feeService = new FeeService({ prisma: ctx.prisma });
      return feeService.getFeeStructure(input.id);
    }),

  getByProgramCampus: protectedProcedure
    .input(z.object({ programCampusId: z.string() }))
    .query(async ({ ctx, input }) => {
      const feeService = new FeeService({ prisma: ctx.prisma });
      return feeService.getFeeStructuresByProgramCampus(input.programCampusId);
    }),

  update: protectedProcedure
    .input(updateFeeStructureSchema)
    .mutation(async ({ ctx, input }) => {
      const feeService = new FeeService({ prisma: ctx.prisma });
      return feeService.updateFeeStructure({
        ...input,
        updatedById: ctx.session.user.id,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const feeService = new FeeService({ prisma: ctx.prisma });
      return feeService.deleteFeeStructure(input.id);
    }),
});
