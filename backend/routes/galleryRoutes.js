import express from 'express';
import {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadImage } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getGallery);
router.post('/', protect, admin, uploadImage.single('image'), createGallery);
router.put('/:id', protect, admin, uploadImage.single('image'), updateGallery);
router.delete('/:id', protect, admin, deleteGallery);

export default router;