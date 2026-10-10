import express from 'express';
import { getAlumni, createAlumni, deleteAlumni } from '../controllers/alumniController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAlumni);
router.post('/', createAlumni);
router.delete('/:id', protect, admin, deleteAlumni);

export default router;