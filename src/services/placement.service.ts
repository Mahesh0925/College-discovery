import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import { parsePagination } from '../utils/pagination';
import { buildPaginationMeta } from '../utils/response';
import { CreatePlacementInput, UpdatePlacementInput } from '../validations/placement.validation';

export async function getPlacementsByCollege(
  collegeId: string,
  pageStr?: string,
  limitStr?: string
) {
  const { page, limit, skip } = parsePagination(pageStr, limitStr);

  const [stats, total] = await Promise.all([
    prisma.placementStat.findMany({
      where: { college_id: collegeId },
      skip,
      take: limit,
      orderBy: { year: 'desc' },
    }),
    prisma.placementStat.count({ where: { college_id: collegeId } }),
  ]);

  return { stats, meta: buildPaginationMeta(total, page, limit) };
}

export async function getPlacementStatById(id: string) {
  return prisma.placementStat.findUnique({ where: { id } });
}

export async function createPlacementStat(collegeId: string, data: CreatePlacementInput) {
  return prisma.placementStat.create({
    data: { ...data, college_id: collegeId },
  });
}

export async function updatePlacementStat(id: string, data: UpdatePlacementInput) {
  return prisma.placementStat.update({ where: { id }, data });
}

export async function deletePlacementStat(id: string) {
  return prisma.placementStat.delete({ where: { id } });
}

export async function getTopPlacementColleges(
  year?: number,
  pageStr?: string,
  limitStr?: string
) {
  const { page, limit, skip } = parsePagination(pageStr, limitStr);

  const where: Prisma.PlacementStatWhereInput = {};
  if (year) where.year = year;

  const [stats, total] = await Promise.all([
    prisma.placementStat.findMany({
      where,
      skip,
      take: limit,
      orderBy: { avg_pkg: 'desc' },
      include: {
        college: { select: { id: true, name: true, city: true, state: true, type: true, nirf_rank: true } },
      },
    }),
    prisma.placementStat.count({ where }),
  ]);

  return { stats, meta: buildPaginationMeta(total, page, limit) };
}
