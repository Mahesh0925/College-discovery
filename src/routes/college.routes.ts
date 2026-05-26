import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as ctrl from '../controllers/college.controller';

const router = Router();

// GET /colleges/stats
router.get('/stats', asyncHandler(ctrl.getStats));

// GET /colleges
router.get('/', asyncHandler(ctrl.listColleges));

// POST /colleges
router.post('/', asyncHandler(ctrl.createCollege));

// GET /colleges/:id
router.get('/:id', asyncHandler(ctrl.getCollege));

// PATCH /colleges/:id
router.patch('/:id', asyncHandler(ctrl.updateCollege));

// DELETE /colleges/:id
router.delete('/:id', asyncHandler(ctrl.deleteCollege));

export default router;
