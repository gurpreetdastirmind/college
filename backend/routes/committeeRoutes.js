import express from 'express';
import {
  getCommittees,
  getAllCommittees,
  createCommittee,
  updateCommittee,
  deleteCommittee,
} from '../controllers/committeeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadImage } from '../middleware/uploadMiddleware.js';  // ← ADD THIS

const router = express.Router();

// Public route
router.get('/', getCommittees);

// Admin routes
router.get('/all', protect, admin, getAllCommittees);          // ← THIS WAS MISSING
router.post('/', protect, admin, uploadImage.single('image'), createCommittee);
router.put('/:id', protect, admin, uploadImage.single('image'), updateCommittee);  // ← ADDED
router.delete('/:id', protect, admin, deleteCommittee);

export default router;