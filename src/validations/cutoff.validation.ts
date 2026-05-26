import { z } from 'zod';

const ExamTypeEnum = z.enum([
  'JEE_Main', 'JEE_Advanced', 'NEET', 'CAT', 'GATE', 'XAT', 'CLAT',
  'BITSAT', 'VITEEE', 'MHT_CET', 'KCET', 'WBJEE', 'COMEDK', 'SNAP', 'MAT',
]);

const CategoryTypeEnum = z.enum(['General', 'OBC', 'SC', 'ST', 'EWS', 'PwD']);

export const createCutoffSchema = z.object({
  exam: ExamTypeEnum,
  year: z.number().int().min(2000).max(new Date().getFullYear()),
  category: CategoryTypeEnum,
  cutoff_value: z.number().positive(),
});

export const updateCutoffSchema = createCutoffSchema.partial();

export const cutoffQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  exam: ExamTypeEnum.optional(),
  year: z.string().optional(),
  category: CategoryTypeEnum.optional(),
});

export type CreateCutoffInput = z.infer<typeof createCutoffSchema>;
export type UpdateCutoffInput = z.infer<typeof updateCutoffSchema>;
