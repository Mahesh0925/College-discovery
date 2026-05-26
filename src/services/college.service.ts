import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import { parsePagination } from '../utils/pagination';
import { buildPaginationMeta } from '../utils/response';
import { CreateCollegeInput, UpdateCollegeInput, CollegeQuery } from '../validations/college.validation';

export async function getAllColleges(query: CollegeQuery) {
  const { page, limit, skip } = parsePagination(query.page, query.limit);

  const where: Prisma.CollegeWhereInput = {};

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { city: { contains: query.search, mode: 'insensitive' } },
      { state: { contains: query.search, mode: 'insensitive' } },
    ];
  }
  if (query.state) where.state = { equals: query.state, mode: 'insensitive' };
  if (query.city) where.city = { equals: query.city, mode: 'insensitive' };
  if (query.type) where.type = query.type as Prisma.EnumCollegeTypeFilter;
  if (query.stream) where.streams = { has: query.stream };

  if (query.nirf_rank_min || query.nirf_rank_max) {
    where.nirf_rank = {};
    if (query.nirf_rank_min) where.nirf_rank.gte = parseInt(query.nirf_rank_min, 10);
    if (query.nirf_rank_max) where.nirf_rank.lte = parseInt(query.nirf_rank_max, 10);
  }

  const sortField = query.sort || 'nirf_rank';
  const sortOrder = query.order || 'asc';

  const orderBy: Prisma.CollegeOrderByWithRelationInput =
    sortField === 'nirf_rank'
      ? { nirf_rank: { sort: sortOrder, nulls: 'last' } }
      : { [sortField]: sortOrder };

  const [colleges, total] = await Promise.all([
    prisma.college.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        _count: {
          select: { courseFees: true, placementStats: true, admissionCutoffs: true },
        },
      },
    }),
    prisma.college.count({ where }),
  ]);

  return { colleges, meta: buildPaginationMeta(total, page, limit) };
}

export async function getCollegeById(id: string) {
  return prisma.college.findUnique({
    where: { id },
    include: {
      courseFees: true,
      placementStats: { orderBy: { year: 'desc' } },
      admissionCutoffs: { orderBy: [{ exam: 'asc' }, { year: 'desc' }, { category: 'asc' }] },
    },
  });
}

export async function createCollege(data: CreateCollegeInput) {
  return prisma.college.create({ data });
}

export async function updateCollege(id: string, data: UpdateCollegeInput) {
  return prisma.college.update({ where: { id }, data });
}

export async function deleteCollege(id: string) {
  return prisma.college.delete({ where: { id } });
}

export async function getCollegeStats() {
  const [total, byType, byState, topRanked] = await Promise.all([
    prisma.college.count(),
    prisma.college.groupBy({ by: ['type'], _count: { _all: true } }),
    prisma.college.groupBy({ by: ['state'], _count: { _all: true }, orderBy: { _count: { state: 'desc' } }, take: 10 }),
    prisma.college.findMany({
      where: { nirf_rank: { not: null } },
      orderBy: { nirf_rank: 'asc' },
      take: 10,
      select: { id: true, name: true, nirf_rank: true, type: true, state: true },
    }),
  ]);

  return { total, byType, byState, topRanked };
}
