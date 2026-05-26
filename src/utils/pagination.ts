export interface ParsedPagination {
  page: number;
  limit: number;
  skip: number;
}

export function parsePagination(
  pageStr?: string,
  limitStr?: string,
  maxLimit = 100
): ParsedPagination {
  const page = Math.max(1, parseInt(pageStr || '1', 10) || 1);
  const limit = Math.min(maxLimit, Math.max(1, parseInt(limitStr || '20', 10) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
