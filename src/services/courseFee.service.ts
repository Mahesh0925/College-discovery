import prisma from '../config/prisma';
import { parsePagination } from '../utils/pagination';
import { buildPaginationMeta } from '../utils/response';
import { CreateCourseFeeInput, UpdateCourseFeeInput } from '../validations/courseFee.validation';

export async function getCoursesByCollege(
  collegeId: string,
  pageStr?: string,
  limitStr?: string
) {
  const { page, limit, skip } = parsePagination(pageStr, limitStr);

  const [fees, total] = await Promise.all([
    prisma.courseFee.findMany({
      where: { college_id: collegeId },
      skip,
      take: limit,
      orderBy: { degree: 'asc' },
    }),
    prisma.courseFee.count({ where: { college_id: collegeId } }),
  ]);

  return { fees, meta: buildPaginationMeta(total, page, limit) };
}

export async function getCourseFeeById(id: string) {
  return prisma.courseFee.findUnique({ where: { id } });
}

export async function createCourseFee(collegeId: string, data: CreateCourseFeeInput) {
  return prisma.courseFee.create({
    data: { ...data, college_id: collegeId },
  });
}

export async function updateCourseFee(id: string, data: UpdateCourseFeeInput) {
  return prisma.courseFee.update({ where: { id }, data });
}

export async function deleteCourseFee(id: string) {
  return prisma.courseFee.delete({ where: { id } });
}

export async function getCourseFeeComparison(course: string, degree?: string) {
  return prisma.courseFee.findMany({
    where: {
      course: { contains: course, mode: 'insensitive' },
      ...(degree && { degree: degree as never }),
    },
    include: {
      college: { select: { id: true, name: true, city: true, state: true, type: true, nirf_rank: true } },
    },
    orderBy: { annual_fee: 'asc' },
  });
}
