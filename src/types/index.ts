import { Request, Response, NextFunction } from 'express';

// Generic API response shape
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: PaginationMeta;
  errors?: ValidationError[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Query param helpers
export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface CollegeFilterQuery extends PaginationQuery {
  state?: string;
  city?: string;
  type?: string;
  stream?: string;
  nirf_rank_min?: string;
  nirf_rank_max?: string;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PlacementFilterQuery extends PaginationQuery {
  year?: string;
  min_avg_pkg?: string;
  min_placement_pct?: string;
}

export interface CutoffFilterQuery extends PaginationQuery {
  exam?: string;
  year?: string;
  category?: string;
}

// Express typed handler
export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
