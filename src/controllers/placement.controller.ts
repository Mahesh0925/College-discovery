import { Request, Response } from 'express';
import * as placementService from '../services/placement.service';
import { sendSuccess, sendError } from '../utils/response';
import {
  createPlacementSchema,
  updatePlacementSchema,
} from '../validations/placement.validation';

export async function listPlacementsByCollege(req: Request, res: Response): Promise<void> {
  const { stats, meta } = await placementService.getPlacementsByCollege(
    req.params.collegeId as string,
    req.query.page as string,
    req.query.limit as string
  );
  sendSuccess(res, stats, 'Placement stats fetched successfully', 200, meta);
}

export async function getPlacementStat(req: Request, res: Response): Promise<void> {
  const stat = await placementService.getPlacementStatById(req.params.id as string);
  if (!stat) {
    sendError(res, 'Placement stat not found', 404);
    return;
  }
  sendSuccess(res, stat, 'Placement stat fetched successfully');
}

export async function createPlacementStat(req: Request, res: Response): Promise<void> {
  const data = createPlacementSchema.parse(req.body);
  const stat = await placementService.createPlacementStat(req.params.collegeId as string, data);
  sendSuccess(res, stat, 'Placement stat created successfully', 201);
}

export async function updatePlacementStat(req: Request, res: Response): Promise<void> {
  const data = updatePlacementSchema.parse(req.body);
  const stat = await placementService.updatePlacementStat(req.params.id as string, data);
  sendSuccess(res, stat, 'Placement stat updated successfully');
}

export async function deletePlacementStat(req: Request, res: Response): Promise<void> {
  await placementService.deletePlacementStat(req.params.id as string);
  sendSuccess(res, null, 'Placement stat deleted successfully');
}

export async function topPlacements(req: Request, res: Response): Promise<void> {
  const year = req.query.year ? parseInt(req.query.year as string, 10) : undefined;
  const { stats, meta } = await placementService.getTopPlacementColleges(
    year,
    req.query.page as string,
    req.query.limit as string
  );
  sendSuccess(res, stats, 'Top placement colleges fetched successfully', 200, meta);
}
