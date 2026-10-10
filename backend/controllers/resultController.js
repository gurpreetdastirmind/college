import { Result } from '../models/index.js';
import { Op } from 'sequelize';

export const getResults = async (req, res) => {
  const { rollNo } = req.query;
  const where = rollNo ? { roll_no: { [Op.like]: `%${rollNo}%` } } : {};
  const results = await Result.findAll({ where, order: [['id', 'DESC']] });
  res.json({ results });
};

export const createResult = async (req, res) => {
  const result = await Result.create(req.body);
  res.status(201).json({ result });
};

export const deleteResult = async (req, res) => {
  const r = await Result.findByPk(req.params.id);
  if (!r) return res.status(404).json({ message: 'Not found' });
  await r.destroy();
  res.json({ message: 'Deleted' });
};