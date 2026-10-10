import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Prospectus = sequelize.define('Prospectus', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  file_url: { type: DataTypes.STRING(500), allowNull: true },   // uploaded PDF path
  link_url: { type: DataTypes.STRING(500), allowNull: true },   // external PDF URL
  academic_year: { type: DataTypes.STRING(20), allowNull: true }, // e.g., "2026-27"
  publish_date: { type: DataTypes.DATEONLY, allowNull: true },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'prospectuses',
});

export default Prospectus;