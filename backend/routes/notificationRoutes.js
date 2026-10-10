import express from 'express';
import {
  getNotifications, createNotification, updateNotification, deleteNotification,
} from '../controllers/notificationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadPDF } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getNotifications);
router.post('/', protect, admin, uploadPDF.single('pdf'), createNotification);
router.put('/:id', protect, admin, uploadPDF.single('pdf'), updateNotification);
router.delete('/:id', protect, admin, deleteNotification);

export default router;