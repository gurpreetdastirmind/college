import { Alumni } from '../models/index.js';

export const getAlumni = async (req, res) => {
  const alumni = await Alumni.findAll({ order: [['id', 'DESC']] });
  res.json({ alumni });
};

export const createAlumni = async (req, res) => {
  const a = await Alumni.create(req.body);
  res.status(201).json({ alumni: a });
};

export const deleteAlumni = async (req, res) => {
  const a = await Alumni.findByPk(req.params.id);
  if (!a) return res.status(404).json({ message: 'Not found' });
  await a.destroy();
  res.json({ message: 'Deleted' });
};