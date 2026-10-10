import { Gallery } from '../models/index.js';

// @desc    Get all gallery items
// @route   GET /api/gallery
export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findAll({ order: [['id', 'DESC']] });
    res.json({ gallery });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create gallery item (file OR url)
// @route   POST /api/gallery
export const createGallery = async (req, res) => {
  try {
    const { title, category, image_url: bodyUrl } = req.body;

    let image_url = null;
    if (req.file) {
      image_url = `/uploads/images/${req.file.filename}`;
    } else if (bodyUrl && bodyUrl.trim()) {
      image_url = bodyUrl.trim();
    }

    if (!image_url) {
      return res.status(400).json({ message: 'Please upload an image or provide an image URL.' });
    }

    const item = await Gallery.create({ title, category, image_url });
    res.status(201).json({ gallery: item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update gallery item (file OR url)
// @route   PUT /api/gallery/:id
export const updateGallery = async (req, res) => {
  try {
    const item = await Gallery.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    const { title, category, image_url: bodyUrl } = req.body;
    let image_url = item.image_url;

    // Prefer new upload > new URL > keep existing
    if (req.file) {
      image_url = `/uploads/images/${req.file.filename}`;
    } else if (bodyUrl && bodyUrl.trim()) {
      image_url = bodyUrl.trim();
    }

    await item.update({
      title: title ?? item.title,
      category: category ?? item.category,
      image_url,
    });

    res.json({ gallery: item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
export const deleteGallery = async (req, res) => {
  try {
    const item = await Gallery.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};