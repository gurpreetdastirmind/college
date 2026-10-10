import { Placement } from '../models/index.js';

export const getPlacements = async (req, res) => {
  const placements = await Placement.findAll({ order: [['id', 'DESC']] });
  res.json({ placements });
};

export const createPlacement = async (req, res) => {
  const p = await Placement.create(req.body);
  res.status(201).json({ placement: p });
};

export const deletePlacement = async (req, res) => {
  const p = await Placement.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  await p.destroy();
  res.json({ message: 'Deleted' });
};