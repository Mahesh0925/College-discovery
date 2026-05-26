import { z } from 'zod';

export const createPlacementSchema = z.object({
  year: z.number().int().min(2000).max(new Date().getFullYear()),
  avg_pkg: z.number().positive(),
  max_pkg: z.number().positive(),
  placement_pct: z.number().min(0).max(100),
  top_recruiters: z.array(z.string().min(1)).min(1),
});

export const updatePlacementSchema = createPlacementSchema.partial();

export const placementQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  year: z.string().optional(),
  min_avg_pkg: z.string().optional(),
  min_placement_pct: z.string().optional(),
});

export type CreatePlacementInput = z.infer<typeof createPlacementSchema>;
export type UpdatePlacementInput = z.infer<typeof updatePlacementSchema>;
