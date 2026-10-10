import multer from 'multer';
import path from 'path';
import fs from 'fs';

/**
 * Create storage engine for a specific folder
 */
const makeStorage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `uploads/${folder}`;
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, unique + path.extname(file.originalname));
    },
  });

/**
 * File type filter
 */
const fileFilter = (allowed) => (req, file, cb) => {
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Invalid file type'), false);
};

/* ============================================
   PDF UPLOAD — for notifications, syllabus, prospectus
   Max size: 100 MB
   ============================================ */
export const uploadPDF = multer({
  storage: makeStorage('pdfs'),
  fileFilter: fileFilter(['application/pdf']),
  limits: { fileSize: 100 * 1024 * 1024 }, // ✅ 100 MB
});

/* ============================================
   IMAGE UPLOAD — for gallery, faculty photos
   Max size: 5 MB
   ============================================ */
export const uploadImage = multer({
  storage: makeStorage('images'),
  fileFilter: fileFilter(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  limits: { fileSize: 5 * 1024 * 1024 },
});

/* ============================================
   MIXED UPLOAD — images + PDFs
   Max size: 100 MB
   ============================================ */
export const uploadMixed = multer({
  storage: makeStorage('mixed'),
  fileFilter: fileFilter([
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ]),
  limits: { fileSize: 100 * 1024 * 1024 }, // ✅ 100 MB
});

/* ============================================
   MULTER ERROR HANDLER
   ============================================ */
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Max 100 MB.',   // ✅ updated
      });
    }
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
    });
  }
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  next();
};