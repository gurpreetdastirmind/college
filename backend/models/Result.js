import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Result = sequelize.define('Result', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  roll_no: { type: DataTypes.STRING(20), allowNull: false },
  student_name: { type: DataTypes.STRING(100), allowNull: false },
  course_id: { type: DataTypes.INTEGER },
  semester: { type: DataTypes.STRING(20) },
  marks: { type: DataTypes.STRING(50) },
  status: { type: DataTypes.STRING(20) },
  published_date: { type: DataTypes.DATEONLY },
});

export default Result;