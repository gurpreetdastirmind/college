import { Activity } from '../models/index.js';

// GET /api/activities  (public)
export const getActivities = async (req, res) => {
  try {
    const items = await Activity.findAll({
      where: { is_active: true },
      order: [['order', 'ASC'], ['id', 'ASC']],
    });
    res.json({ success: true, activities: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/activities/all  (admin — includes inactive)
export const getAllActivities = async (req, res) => {
  try {
    const items = await Activity.findAll({ order: [['order', 'ASC'], ['id', 'ASC']] });
    res.json({ success: true, activities: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/activities  (admin only)
export const createActivity = async (req, res) => {
  try {
    const { name, description, icon, order, is_active } = req.body;
    const item = await Activity.create({
      name,
      description: description || null,
      icon: icon || null,
      order: order || 0,
      is_active: is_active === 'true' || is_active === true,
    });
    res.status(201).json({ success: true, activity: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/activities/:id  (admin only)
export const updateActivity = async (req, res) => {
  try {
    const item = await Activity.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });

    const { name, description, icon, order, is_active } = req.body;
    if (name !== undefined) item.name = name;
    if (description !== undefined) item.description = description || null;
    if (icon !== undefined) item.icon = icon || null;
    if (order !== undefined) item.order = order;
    if (is_active !== undefined) item.is_active = is_active === 'true' || is_active === true;

    await item.save();
    res.json({ success: true, activity: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/activities/:id
export const deleteActivity = async (req, res) => {
  try {
    const item = await Activity.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await item.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};