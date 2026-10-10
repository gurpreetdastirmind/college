import { CommitteeMember } from '../models/index.js';
import fs from 'fs';
import path from 'path';

// @desc    Get active committee members (Public site)
// @route   GET /api/committees
export const getCommittees = async (req, res) => {
  try {
    const committees = await CommitteeMember.findAll({
      where: { is_active: true },
      order: [['order', 'ASC']],
    });
    res.json({ committees });
  } catch (err) {
    console.error('getCommittees error:', err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get ALL committee members (Admin panel)
// @route   GET /api/committees/all
export const getAllCommittees = async (req, res) => {
  try {
    const committees = await CommitteeMember.findAll({
      order: [['order', 'ASC']],
    });
    res.json({ committees });
  } catch (err) {
    console.error('getAllCommittees error:', err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a committee member
// @route   POST /api/committees
export const createCommittee = async (req, res) => {
  try {
    const { name, role, order, is_active } = req.body;

    let image_url = null;
    if (req.file) {
      image_url = `/uploads/images/${req.file.filename}`;
    }

    const c = await CommitteeMember.create({
      name,
      role,
      image_url,
      order: order || 0,
      is_active: is_active === 'true' || is_active === true,
    });

    res.status(201).json({ committee: c });
  } catch (err) {
    console.error('createCommittee error:', err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update a committee member
// @route   PUT /api/committees/:id
export const updateCommittee = async (req, res) => {
  try {
    const c = await CommitteeMember.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Not found' });

    const { name, role, order, is_active } = req.body;
    let image_url = c.image_url;

    if (req.file) {
      if (c.image_url) {
        const oldPath = path.join(process.cwd(), c.image_url);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      image_url = `/uploads/images/${req.file.filename}`;
    }

    await c.update({
      name: name || c.name,
      role: role || c.role,
      image_url,
      order: order !== undefined ? order : c.order,
      is_active: is_active !== undefined ? (is_active === 'true' || is_active === true) : c.is_active,
    });

    res.json({ committee: c });
  } catch (err) {
    console.error('updateCommittee error:', err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a committee member
// @route   DELETE /api/committees/:id
export const deleteCommittee = async (req, res) => {
  try {
    const c = await CommitteeMember.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Not found' });

    if (c.image_url) {
      const imgPath = path.join(process.cwd(), c.image_url);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await c.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('deleteCommittee error:', err);
    res.status(500).json({ message: err.message });
  }
};