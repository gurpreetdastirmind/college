// Load env FIRST, before anything else reads process.env
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { handleMulterError } from './middleware/uploadMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import admissionRoutes from './routes/admissionRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import committeeRoutes from './routes/committeeRoutes.js';
import placementRoutes from './routes/placementRoutes.js';
import alumniRoutes from './routes/alumniRoutes.js';
import heroSlideRoutes from './routes/heroSlideRoutes.js';
import academicRoutes from './routes/academicRoutes.js';
import prospectusRoutes from './routes/prospectusRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

await connectDB();

// ============================================
// MIDDLEWARE
// ============================================
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    frameguard: false,
    contentSecurityPolicy: false,
  })
);

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Rate limiter for public forms
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: 'Too many requests, please try again later.',
});

// ============================================
// STATIC UPLOADS
// ============================================
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res) => {
      res.setHeader('Content-Disposition', 'inline');
      res.setHeader('X-Frame-Options', 'ALLOWALL');
      res.setHeader('Access-Control-Allow-Origin', '*');
    },
  })
);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Punjab College API running' });
});

// ============================================
// ROUTES
// ============================================
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admissions', formLimiter, admissionRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', formLimiter, messageRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/committees', committeeRoutes);   // ✅ PLURAL — matches frontend
app.use('/api/placements', placementRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/hero-slides', heroSlideRoutes);
app.use('/api/academics', academicRoutes);
app.use('/api/prospectus', prospectusRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/admin', adminRoutes);

// Multer error handler
app.use(handleMulterError);

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});