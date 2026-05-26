import { z } from 'zod';

const DegreeTypeEnum = z.enum([
  'BTech', 'MTech', 'MBA', 'MCA', 'MBBS', 'MD', 'BCA', 'BSc', 'MSc',
  'BArch', 'MArch', 'BPharm', 'MPharm', 'PhD', 'BBA', 'BCom', 'MCom',
  'BA', 'MA', 'LLB', 'LLM',
]);

export const createCourseFeeSchema = z.object({
  course: z.string().min(2).max(200),
  degree: DegreeTypeEnum,
  annual_fee: z.number().int().positive(),
});

export const updateCourseFeeSchema = createCourseFeeSchema.partial();

export type CreateCourseFeeInput = z.infer<typeof createCourseFeeSchema>;
export type UpdateCourseFeeInput = z.infer<typeof updateCourseFeeSchema>;
