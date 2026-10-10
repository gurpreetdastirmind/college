import express from 'express';
import { getPlacements, createPlacement, deletePlacement } from '../controllers/placementController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPlacements);
router.post('/', protect, admin, createPlacement);
router.delete('/:id', protect, admin, deletePlacement);

export default router;