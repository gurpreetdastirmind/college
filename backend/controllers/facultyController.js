import { Faculty } from '../models/index.js';

export const getFaculty = async (req, res) => {
  const faculty = await Faculty.findAll({ order: [['id', 'ASC']] });
  res.json({ faculty });
};

export const createFaculty = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = `/uploads/images/${req.file.filename}`;
  const faculty = await Faculty.create(data);
  res.status(201).json({ faculty });
};

export const updateFaculty = async (req, res) => {
  const f = await Faculty.findByPk(req.params.id);
  if (!f) return res.status(404).json({ message: 'Not found' });
  const data = { ...req.body };
  if (req.file) data.photo = `/uploads/images/${req.file.filename}`;
  await f.update(data);
  res.json({ faculty: f });
};

export const deleteFaculty = async (req, res) => {
  const f = await Faculty.findByPk(req.params.id);
  if (!f) return res.status(404).json({ message: 'Not found' });
  await f.destroy();
  res.json({ message: 'Deleted' });
};