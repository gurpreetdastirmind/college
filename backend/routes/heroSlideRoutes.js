import express from 'express';
import {
  getHeroSlides,
  getAllHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from '../controllers/heroSlideController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadImage } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public — only active slides
router.get('/', getHeroSlides);

// Admin — all slides (active + inactive)
router.get('/all', protect, admin, getAllHeroSlides);

// Admin — create with optional image upload
router.post('/', protect, admin, uploadImage.single('image'), createHeroSlide);

// Admin — update with optional image upload
router.put('/:id', protect, admin, uploadImage.single('image'), updateHeroSlide);

// Admin — delete
router.delete('/:id', protect, admin, deleteHeroSlide);

export default router;