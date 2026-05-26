import { z } from 'zod';

const CollegeTypeEnum = z.enum([
  'IIT', 'NIT', 'IIIT', 'BITS', 'Government', 'Private', 'Deemed',
  'Central_University', 'State_University',
]);

export const createCollegeSchema = z.object({
  name: z.string().min(2).max(200),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  type: CollegeTypeEnum,
  streams: z.array(z.string().min(1)).min(1),
  nirf_rank: z.number().int().positive().optional().nullable(),
  established: z.number().int().min(1700).max(new Date().getFullYear()),
});

export const updateCollegeSchema = createCollegeSchema.partial();

export const collegeQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  type: CollegeTypeEnum.optional(),
  stream: z.string().optional(),
  nirf_rank_min: z.string().optional(),
  nirf_rank_max: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(['name', 'nirf_rank', 'established', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export type CreateCollegeInput = z.infer<typeof createCollegeSchema>;
export type UpdateCollegeInput = z.infer<typeof updateCollegeSchema>;
export type CollegeQuery = z.infer<typeof collegeQuerySchema>;
