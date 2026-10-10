import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Faculty = sequelize.define('Faculty', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  designation: { type: DataTypes.STRING(100) },
  dept: { type: DataTypes.STRING(100) },
  qualification: { type: DataTypes.STRING(200) },
  exp: { type: DataTypes.STRING(50) },
  email: { type: DataTypes.STRING(100) },
  photo: { type: DataTypes.STRING(255) },
});

export default Faculty;