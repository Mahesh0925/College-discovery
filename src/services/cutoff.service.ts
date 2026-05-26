import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import { parsePagination } from '../utils/pagination';
import { buildPaginationMeta } from '../utils/response';
import { CreateCutoffInput, UpdateCutoffInput } from '../validations/cutoff.validation';

export async function getCutoffsByCollege(
  collegeId: string,
  query: { exam?: string; year?: string; category?: string; page?: string; limit?: string }
) {
  const { page, limit, skip } = parsePagination(query.page, query.limit);

  const where: Prisma.AdmissionCutoffWhereInput = { college_id: collegeId };
  if (query.exam) where.exam = query.exam as never;
  if (query.year) where.year = parseInt(query.year, 10);
  if (query.category) where.category = query.category as never;

  const [cutoffs, total] = await Promise.all([
    prisma.admissionCutoff.findMany({
      where,
      skip,
      take: limit,
      orderBy: [{ exam: 'asc' }, { year: 'desc' }, { category: 'asc' }],
    }),
    prisma.admissionCutoff.count({ where }),
  ]);

  return { cutoffs, meta: buildPaginationMeta(total, page, limit) };
}

export async function getCutoffById(id: string) {
  return prisma.admissionCutoff.findUnique({ where: { id } });
}

export async function createCutoff(collegeId: string, data: CreateCutoffInput) {
  return prisma.admissionCutoff.create({
    data: { ...data, college_id: collegeId },
  });
}

export async function updateCutoff(id: string, data: UpdateCutoffInput) {
  return prisma.admissionCutoff.update({ where: { id }, data });
}

export async function deleteCutoff(id: string) {
  return prisma.admissionCutoff.delete({ where: { id } });
}

export async function getCutoffComparison(
  exam: string,
  year: number,
  category: string,
  pageStr?: string,
  limitStr?: string
) {
  const { page, limit, skip } = parsePagination(pageStr, limitStr);

  const where: Prisma.AdmissionCutoffWhereInput = {
    exam: exam as never,
    year,
    category: category as never,
  };

  const [cutoffs, total] = await Promise.all([
    prisma.admissionCutoff.findMany({
      where,
      skip,
      take: limit,
      orderBy: { cutoff_value: 'desc' },
      include: {
        college: { select: { id: true, name: true, city: true, state: true, type: true, nirf_rank: true } },
      },
    }),
    prisma.admissionCutoff.count({ where }),
  ]);

  return { cutoffs, meta: buildPaginationMeta(total, page, limit) };
}
