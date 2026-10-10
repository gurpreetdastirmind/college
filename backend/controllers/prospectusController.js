import { Prospectus } from '../models/index.js';
import fs from 'fs';
import path from 'path';

// GET /api/prospectus  (public — only active)
export const getProspectus = async (req, res) => {
  try {
    const items = await Prospectus.findAll({
      where: { is_active: true },
      order: [['publish_date', 'DESC'], ['id', 'DESC']],
    });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/prospectus/all  (admin — includes inactive)
export const getAllProspectus = async (req, res) => {
  try {
    const items = await Prospectus.findAll({
      order: [['id', 'DESC']],
    });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/prospectus
export const createProspectus = async (req, res) => {
  try {
    const { title, description, link_url, academic_year, publish_date } = req.body;

    const file_url = req.file ? `/uploads/pdfs/${req.file.filename}` : null;

    if (!file_url && !link_url) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a PDF or provide a PDF link.',
      });
    }

    const item = await Prospectus.create({
      title,
      description: description || null,
      file_url,
      link_url: link_url || null,
      academic_year: academic_year || null,
      publish_date: publish_date || null,
    });

    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/prospectus/:id
export const updateProspectus = async (req, res) => {
  try {
    const item = await Prospectus.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });

    const { title, description, link_url, academic_year, publish_date } = req.body;

    // Replace old PDF if new one uploaded
    if (req.file) {
      if (item.file_url) {
        const oldPath = path.join(process.cwd(), item.file_url);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      item.file_url = `/uploads/pdfs/${req.file.filename}`;
    }

    if (title !== undefined) item.title = title;
    if (description !== undefined) item.description = description || null;
    if (link_url !== undefined) item.link_url = link_url || null;
    if (academic_year !== undefined) item.academic_year = academic_year || null;
    if (publish_date !== undefined) item.publish_date = publish_date || null;

    await item.save();
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/prospectus/:id
export const deleteProspectus = async (req, res) => {
  try {
    const item = await Prospectus.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });

    if (item.file_url) {
      const filePath = path.join(process.cwd(), item.file_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await item.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};