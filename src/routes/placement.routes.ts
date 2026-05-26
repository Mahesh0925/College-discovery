import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as ctrl from '../controllers/placement.controller';

const router = Router({ mergeParams: true });

// GET /colleges/:collegeId/placements
router.get('/', asyncHandler(ctrl.listPlacementsByCollege));

// POST /colleges/:collegeId/placements
router.post('/', asyncHandler(ctrl.createPlacementStat));

// GET /colleges/:collegeId/placements/:id
router.get('/:id', asyncHandler(ctrl.getPlacementStat));

// PATCH /colleges/:collegeId/placements/:id
router.patch('/:id', asyncHandler(ctrl.updatePlacementStat));

// DELETE /colleges/:collegeId/placements/:id
router.delete('/:id', asyncHandler(ctrl.deletePlacementStat));

export default router;
