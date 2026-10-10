import express from 'express';
import { getResults, createResult, deleteResult } from '../controllers/resultController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getResults);
router.post('/', protect, admin, createResult);
router.delete('/:id', protect, admin, deleteResult);

export default router;