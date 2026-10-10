import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Alumni = sequelize.define('Alumni', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  batch: { type: DataTypes.STRING(20) },
  course: { type: DataTypes.STRING(100) },
  current_role: { type: DataTypes.STRING(150) },
  company: { type: DataTypes.STRING(150) },
  email: { type: DataTypes.STRING(100) },
  phone: { type: DataTypes.STRING(15) },
});

export default Alumni;