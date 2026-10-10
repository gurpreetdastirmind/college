import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Placement = sequelize.define('Placement', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  student_name: { type: DataTypes.STRING(100), allowNull: false },
  course: { type: DataTypes.STRING(100) },
  company: { type: DataTypes.STRING(150) },
  package: { type: DataTypes.STRING(50) },
  year: { type: DataTypes.INTEGER },
  photo: { type: DataTypes.STRING(255) },
});

export default Placement;