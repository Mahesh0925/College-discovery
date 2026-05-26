import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as ctrl from '../controllers/courseFee.controller';

const router = Router({ mergeParams: true });

// GET /colleges/:collegeId/courses
router.get('/', asyncHandler(ctrl.listCoursesByCollege));

// POST /colleges/:collegeId/courses
router.post('/', asyncHandler(ctrl.createCourseFee));

// GET /colleges/:collegeId/courses/:id
router.get('/:id', asyncHandler(ctrl.getCourseFee));

// PATCH /colleges/:collegeId/courses/:id
router.patch('/:id', asyncHandler(ctrl.updateCourseFee));

// DELETE /colleges/:collegeId/courses/:id
router.delete('/:id', asyncHandler(ctrl.deleteCourseFee));

export default router;
