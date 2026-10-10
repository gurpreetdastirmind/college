import express from 'express';
import {
  getResources,
  getAllResources,
  createResource,
  updateResource,
  deleteResource,
} from '../controllers/academicController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadPDF } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public
router.get('/', getResources);

// Admin
router.get('/all', protect, admin, getAllResources);
router.post('/', protect, admin, uploadPDF.single('pdf'), createResource);
router.put('/:id', protect, admin, uploadPDF.single('pdf'), updateResource);
router.delete('/:id', protect, admin, deleteResource);

export default router;