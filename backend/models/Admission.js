// models/Admission.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Admission = sequelize.define('Admission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  academic_year: { type: DataTypes.STRING(20), allowNull: true },
  publish_date: { type: DataTypes.DATEONLY, allowNull: true },
  file_url: { type: DataTypes.STRING(500), allowNull: true },
  link_url: { type: DataTypes.STRING(500), allowNull: true },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
});

export default Admission;