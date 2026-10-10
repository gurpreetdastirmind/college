import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Department = sequelize.define('Department', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  hod: { type: DataTypes.STRING(100) },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING(255) },
});

export default Department;