import { Router } from 'express';
import collegeRoutes from './college.routes';
import courseFeeRoutes from './courseFee.routes';
import placementRoutes from './placement.routes';
import cutoffRoutes from './cutoff.routes';
import compareRoutes from './compare.routes';

const router = Router();

router.use('/colleges', collegeRoutes);
router.use('/colleges/:collegeId/courses', courseFeeRoutes);
router.use('/colleges/:collegeId/placements', placementRoutes);
router.use('/colleges/:collegeId/cutoffs', cutoffRoutes);
router.use('/compare', compareRoutes);

export default router;
