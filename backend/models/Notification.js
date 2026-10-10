import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Notification = sequelize.define('Notification', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT },
  category: {
    type: DataTypes.ENUM('admission', 'exam', 'event', 'scholarship', 'general'),
    defaultValue: 'general',
  },
  pdf_url: { type: DataTypes.STRING(255) },
  publish_date: { type: DataTypes.DATEONLY },
});

export default Notification;