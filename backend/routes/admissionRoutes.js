// routes/admissionRoutes.js
import express from 'express';
import {
  getAdmissions,
  getAllAdmissions,
  createAdmission,
  updateAdmission,
  deleteAdmission,
} from '../controllers/admissionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadPDF } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public
router.get('/', getAdmissions);

// Admin
router.get('/all', protect, admin, getAllAdmissions);
router.post('/', protect, admin, uploadPDF.single('pdf'), createAdmission);
router.put('/:id', protect, admin, uploadPDF.single('pdf'), updateAdmission);
router.delete('/:id', protect, admin, deleteAdmission);

export default router;