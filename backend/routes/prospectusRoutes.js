import express from 'express';
import {
  getProspectus,
  getAllProspectus,
  createProspectus,
  updateProspectus,
  deleteProspectus,
} from '../controllers/prospectusController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadPDF } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public
router.get('/', getProspectus);

// Admin
router.get('/all', protect, admin, getAllProspectus);
router.post('/', protect, admin, uploadPDF.single('pdf'), createProspectus);
router.put('/:id', protect, admin, uploadPDF.single('pdf'), updateProspectus);
router.delete('/:id', protect, admin, deleteProspectus);

export default router;