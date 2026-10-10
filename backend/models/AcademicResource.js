import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const AcademicResource = sequelize.define('AcademicResource', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  category: {
    type: DataTypes.ENUM(
      'syllabus',
      'time-table',
      'academic-calendar',
      'e-content',
      'examination',
      'results',
      'programme-outcomes'
    ),
    allowNull: false,
  },
  // NEW: Stores the folder name (e.g., "BBA", "Botany")
  folder_name: { type: DataTypes.STRING, allowNull: true },
  subcategory: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  file_url: { type: DataTypes.STRING, allowNull: true },
  link_url: { type: DataTypes.STRING, allowNull: true },
  publish_date: { type: DataTypes.DATEONLY, allowNull: true },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'academic_resources',
});

export default AcademicResource;