import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { compareCourses } from '../controllers/courseFee.controller';
import { topPlacements } from '../controllers/placement.controller';
import { compareCutoffs } from '../controllers/cutoff.controller';

const router = Router();

// GET /compare/courses?course=B.Tech CSE&degree=BTech
router.get('/courses', asyncHandler(compareCourses));

// GET /compare/placements?year=2024
router.get('/placements', asyncHandler(topPlacements));

// GET /compare/cutoffs?exam=JEE_Main&year=2024&category=General
router.get('/cutoffs', asyncHandler(compareCutoffs));

export default router;
