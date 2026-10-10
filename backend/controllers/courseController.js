import { Course } from '../models/index.js';

export const getCourses = async (req, res) => {
  const courses = await Course.findAll({ order: [['id', 'ASC']] });
  res.json({ courses });
};

export const getCourse = async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json({ course });
};

export const createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json({ course });
};

export const updateCourse = async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) return res.status(404).json({ message: 'Not found' });
  await course.update(req.body);
  res.json({ course });
};

export const deleteCourse = async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) return res.status(404).json({ message: 'Not found' });
  await course.destroy();
  res.json({ message: 'Deleted' });
};