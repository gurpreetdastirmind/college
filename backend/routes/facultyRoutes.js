import express from 'express';
import {
  getFaculty, createFaculty, updateFaculty, deleteFaculty,
} from '../controllers/facultyController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadImage } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getFaculty);
router.post('/', protect, admin, uploadImage.single('photo'), createFaculty);
router.put('/:id', protect, admin, uploadImage.single('photo'), updateFaculty);
router.delete('/:id', protect, admin, deleteFaculty);

export default router;