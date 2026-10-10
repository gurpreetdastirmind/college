import { HeroSlide } from '../models/index.js';
import fs from 'fs';
import path from 'path';

/**
 * GET /api/hero-slides
 * Public — returns all active slides ordered by `order`
 */
export const getHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.findAll({
      where: { is_active: true },
      order: [['order', 'ASC'], ['id', 'ASC']],
    });
    res.json({ success: true, slides });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/hero-slides/all
 * Admin — returns all slides (including inactive)
 */
export const getAllHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.findAll({
      order: [['order', 'ASC'], ['id', 'ASC']],
    });
    res.json({ success: true, slides });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/hero-slides
 * Admin — create slide (multipart/form-data with optional `image`)
 */
export const createHeroSlide = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      cta_label,
      cta_link,
      cta2_label,
      cta2_link,
      order,
      is_active,
    } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: 'Title is required' });
    }

    // If an image was uploaded, save its public path
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/images/${req.file.filename}`;
    }

    const slide = await HeroSlide.create({
      title,
      subtitle: subtitle || null,
      cta_label: cta_label || 'Apply Online Now',
      cta_link: cta_link || '/admissions/apply',
      cta2_label: cta2_label || 'View Courses',
      cta2_link: cta2_link || '/courses',
      image_url,
      order: order ? parseInt(order, 10) : 0,
      is_active: is_active === 'false' ? false : true,
    });

    res.status(201).json({ success: true, slide });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/hero-slides/:id
 * Admin — update slide (image optional; if omitted, keep old one)
 */
export const updateHeroSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await HeroSlide.findByPk(id);

    if (!slide) {
      return res
        .status(404)
        .json({ success: false, message: 'Slide not found' });
    }

    const {
      title,
      subtitle,
      cta_label,
      cta_link,
      cta2_label,
      cta2_link,
      order,
      is_active,
    } = req.body;

    // If a new image is uploaded, delete the old one first
    if (req.file) {
      if (slide.image_url) {
        const oldPath = path.join(process.cwd(), slide.image_url);
        if (fs.existsSync(oldPath)) {
          try {
            fs.unlinkSync(oldPath);
          } catch (e) {
            console.warn('Could not delete old image:', e.message);
          }
        }
      }
      slide.image_url = `/uploads/images/${req.file.filename}`;
    }

    if (title !== undefined) slide.title = title;
    if (subtitle !== undefined) slide.subtitle = subtitle;
    if (cta_label !== undefined) slide.cta_label = cta_label;
    if (cta_link !== undefined) slide.cta_link = cta_link;
    if (cta2_label !== undefined) slide.cta2_label = cta2_label;
    if (cta2_link !== undefined) slide.cta2_link = cta2_link;
    if (order !== undefined) slide.order = parseInt(order, 10);
    if (is_active !== undefined) slide.is_active = is_active === 'true' || is_active === true;

    await slide.save();
    res.json({ success: true, slide });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/hero-slides/:id
 * Admin — delete slide + its image file
 */
export const deleteHeroSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await HeroSlide.findByPk(id);

    if (!slide) {
      return res
        .status(404)
        .json({ success: false, message: 'Slide not found' });
    }

    // Delete image file from disk
    if (slide.image_url) {
      const filePath = path.join(process.cwd(), slide.image_url);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Could not delete image file:', e.message);
        }
      }
    }

    await slide.destroy();
    res.json({ success: true, message: 'Slide deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};