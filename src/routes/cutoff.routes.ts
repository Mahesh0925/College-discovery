import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as ctrl from '../controllers/cutoff.controller';

const router = Router({ mergeParams: true });

// GET /colleges/:collegeId/cutoffs
router.get('/', asyncHandler(ctrl.listCutoffsByCollege));

// POST /colleges/:collegeId/cutoffs
router.post('/', asyncHandler(ctrl.createCutoff));

// GET /colleges/:collegeId/cutoffs/:id
router.get('/:id', asyncHandler(ctrl.getCutoff));

// PATCH /colleges/:collegeId/cutoffs/:id
router.patch('/:id', asyncHandler(ctrl.updateCutoff));

// DELETE /colleges/:collegeId/cutoffs/:id
router.delete('/:id', asyncHandler(ctrl.deleteCutoff));

export default router;
