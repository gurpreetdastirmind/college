import { Department } from '../models/index.js';

export const getDepartments = async (req, res) => {
  const departments = await Department.findAll({ order: [['id', 'ASC']] });
  res.json({ departments });
};

export const createDepartment = async (req, res) => {
  const department = await Department.create(req.body);
  res.status(201).json({ department });
};

export const deleteDepartment = async (req, res) => {
  const d = await Department.findByPk(req.params.id);
  if (!d) return res.status(404).json({ message: 'Not found' });
  await d.destroy();
  res.json({ message: 'Deleted' });
};