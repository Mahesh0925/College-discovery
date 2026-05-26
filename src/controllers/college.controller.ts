import { Request, Response } from 'express';
import * as collegeService from '../services/college.service';
import { sendSuccess, sendError } from '../utils/response';
import {
  createCollegeSchema,
  updateCollegeSchema,
  collegeQuerySchema,
} from '../validations/college.validation';

export async function listColleges(req: Request, res: Response): Promise<void> {
  const query = collegeQuerySchema.parse(req.query);
  const { colleges, meta } = await collegeService.getAllColleges(query);
  sendSuccess(res, colleges, 'Colleges fetched successfully', 200, meta);
}

export async function getCollege(req: Request, res: Response): Promise<void> {
  const college = await collegeService.getCollegeById(req.params.id as string);
  if (!college) {
    sendError(res, 'College not found', 404);
    return;
  }
  sendSuccess(res, college, 'College fetched successfully');
}

export async function createCollege(req: Request, res: Response): Promise<void> {
  const data = createCollegeSchema.parse(req.body);
  const college = await collegeService.createCollege(data);
  sendSuccess(res, college, 'College created successfully', 201);
}

export async function updateCollege(req: Request, res: Response): Promise<void> {
  const data = updateCollegeSchema.parse(req.body);
  const college = await collegeService.updateCollege(req.params.id as string, data);
  sendSuccess(res, college, 'College updated successfully');
}

export async function deleteCollege(req: Request, res: Response): Promise<void> {
  await collegeService.deleteCollege(req.params.id as string);
  sendSuccess(res, null, 'College deleted successfully');
}

export async function getStats(req: Request, res: Response): Promise<void> {
  const stats = await collegeService.getCollegeStats();
  sendSuccess(res, stats, 'Stats fetched successfully');
}
