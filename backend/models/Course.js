import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Course = sequelize.define('Course', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  stream: { type: DataTypes.STRING(50), allowNull: false },
  degree_type: { type: DataTypes.STRING(20) },
  duration: { type: DataTypes.STRING(30), allowNull: false },
  seats: { type: DataTypes.INTEGER, allowNull: false },
  eligibility: { type: DataTypes.TEXT },
  fees: { type: DataTypes.STRING(50) },
  description: { type: DataTypes.TEXT },
  syllabus_pdf: { type: DataTypes.STRING(255) },
});

export default Course;