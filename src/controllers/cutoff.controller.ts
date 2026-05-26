import { Request, Response } from 'express';
import * as cutoffService from '../services/cutoff.service';
import { sendSuccess, sendError } from '../utils/response';
import {
  createCutoffSchema,
  updateCutoffSchema,
} from '../validations/cutoff.validation';

export async function listCutoffsByCollege(req: Request, res: Response): Promise<void> {
  const { cutoffs, meta } = await cutoffService.getCutoffsByCollege(
    req.params.collegeId as string,
    req.query as Record<string, string>
  );
  sendSuccess(res, cutoffs, 'Admission cutoffs fetched successfully', 200, meta);
}

export async function getCutoff(req: Request, res: Response): Promise<void> {
  const cutoff = await cutoffService.getCutoffById(req.params.id as string);
  if (!cutoff) {
    sendError(res, 'Cutoff record not found', 404);
    return;
  }
  sendSuccess(res, cutoff, 'Cutoff fetched successfully');
}

export async function createCutoff(req: Request, res: Response): Promise<void> {
  const data = createCutoffSchema.parse(req.body);
  const cutoff = await cutoffService.createCutoff(req.params.collegeId as string, data);
  sendSuccess(res, cutoff, 'Cutoff created successfully', 201);
}

export async function updateCutoff(req: Request, res: Response): Promise<void> {
  const data = updateCutoffSchema.parse(req.body);
  const cutoff = await cutoffService.updateCutoff(req.params.id as string, data);
  sendSuccess(res, cutoff, 'Cutoff updated successfully');
}

export async function deleteCutoff(req: Request, res: Response): Promise<void> {
  await cutoffService.deleteCutoff(req.params.id as string);
  sendSuccess(res, null, 'Cutoff deleted successfully');
}

export async function compareCutoffs(req: Request, res: Response): Promise<void> {
  const { exam, year, category } = req.query as Record<string, string>;
  if (!exam || !year || !category) {
    sendError(res, 'Query params "exam", "year", and "category" are required', 400);
    return;
  }
  const { cutoffs, meta } = await cutoffService.getCutoffComparison(
    exam,
    parseInt(year, 10),
    category,
    req.query.page as string,
    req.query.limit as string
  );
  sendSuccess(res, cutoffs, 'Cutoff comparison fetched successfully', 200, meta);
}
