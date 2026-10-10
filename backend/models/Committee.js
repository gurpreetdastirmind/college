import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Committee = sequelize.define('Committee', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  incharge_name: { type: DataTypes.STRING(100) },
  designation: { type: DataTypes.STRING(100) },
  phone: { type: DataTypes.STRING(15) },
  email: { type: DataTypes.STRING(100) },
  description: { type: DataTypes.TEXT },
});

export default Committee;