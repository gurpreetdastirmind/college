// controllers/admissionController.js
import fs from 'fs';
import path from 'path';
import { Admission } from '../models/index.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// GET /api/admissions  (public — active only)
export const getAdmissions = asyncHandler(async (req, res) => {
  const admissions = await Admission.findAll({
    where: { is_active: true },
    order: [['publish_date', 'DESC'], ['id', 'DESC']],
  });
  res.json({ success: true, admissions });
});

// GET /api/admissions/all  (admin — all)
export const getAllAdmissions = asyncHandler(async (req, res) => {
  const admissions = await Admission.findAll({
    order: [['id', 'DESC']],
  });
  res.json({ success: true, admissions });
});

// POST /api/admissions  (admin)
export const createAdmission = asyncHandler(async (req, res) => {
  const { title, description, academic_year, publish_date, link_url } = req.body;

  let file_url = null;
  if (req.file) {
    file_url = `/uploads/pdfs/${req.file.filename}`;
  }

  if (!file_url && !link_url) {
    return res.status(400).json({
      success: false,
      message: 'Please upload a PDF or provide a link.',
    });
  }

  const admission = await Admission.create({
    title,
    description: description || null,
    academic_year: academic_year || null,
    publish_date: publish_date || null,
    file_url,
    link_url: link_url || null,
  });

  res.status(201).json({ success: true, admission });
});

// PUT /api/admissions/:id  (admin)
export const updateAdmission = asyncHandler(async (req, res) => {
  const admission = await Admission.findByPk(req.params.id);
  if (!admission) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  const { title, description, academic_year, publish_date, link_url, is_active } = req.body;

  if (req.file) {
    // Delete old file
    if (admission.file_url) {
      const oldPath = path.join(process.cwd(), admission.file_url);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    admission.file_url = `/uploads/pdfs/${req.file.filename}`;
  }

  if (title !== undefined) admission.title = title;
  if (description !== undefined) admission.description = description || null;
  if (academic_year !== undefined) admission.academic_year = academic_year || null;
  if (publish_date !== undefined) admission.publish_date = publish_date || null;
  if (link_url !== undefined) admission.link_url = link_url || null;
  if (is_active !== undefined) admission.is_active = is_active === 'true' || is_active === true;

  await admission.save();
  res.json({ success: true, admission });
});

// DELETE /api/admissions/:id  (admin)
export const deleteAdmission = asyncHandler(async (req, res) => {
  const admission = await Admission.findByPk(req.params.id);
  if (!admission) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  if (admission.file_url) {
    const filePath = path.join(process.cwd(), admission.file_url);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  await admission.destroy();
  res.json({ success: true });
});