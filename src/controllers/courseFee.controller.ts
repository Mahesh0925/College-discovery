import { Request, Response } from 'express';
import * as courseFeeService from '../services/courseFee.service';
import { sendSuccess, sendError } from '../utils/response';
import {
  createCourseFeeSchema,
  updateCourseFeeSchema,
} from '../validations/courseFee.validation';

export async function listCoursesByCollege(req: Request, res: Response): Promise<void> {
  const { fees, meta } = await courseFeeService.getCoursesByCollege(
    req.params.collegeId as string,
    req.query.page as string,
    req.query.limit as string
  );
  sendSuccess(res, fees, 'Course fees fetched successfully', 200, meta);
}

export async function getCourseFee(req: Request, res: Response): Promise<void> {
  const fee = await courseFeeService.getCourseFeeById(req.params.id as string);
  if (!fee) {
    sendError(res, 'Course fee record not found', 404);
    return;
  }
  sendSuccess(res, fee, 'Course fee fetched successfully');
}

export async function createCourseFee(req: Request, res: Response): Promise<void> {
  const data = createCourseFeeSchema.parse(req.body);
  const fee = await courseFeeService.createCourseFee(req.params.collegeId as string, data);
  sendSuccess(res, fee, 'Course fee created successfully', 201);
}

export async function updateCourseFee(req: Request, res: Response): Promise<void> {
  const data = updateCourseFeeSchema.parse(req.body);
  const fee = await courseFeeService.updateCourseFee(req.params.id as string, data);
  sendSuccess(res, fee, 'Course fee updated successfully');
}

export async function deleteCourseFee(req: Request, res: Response): Promise<void> {
  await courseFeeService.deleteCourseFee(req.params.id as string);
  sendSuccess(res, null, 'Course fee deleted successfully');
}

export async function compareCourses(req: Request, res: Response): Promise<void> {
  const { course, degree } = req.query as { course?: string; degree?: string };
  if (!course) {
    sendError(res, 'Query param "course" is required', 400);
    return;
  }
  const data = await courseFeeService.getCourseFeeComparison(course, degree);
  sendSuccess(res, data, 'Course fee comparison fetched successfully');
}
