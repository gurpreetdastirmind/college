import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Gallery = sequelize.define('Gallery', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(150), allowNull: false },
  image_url: { type: DataTypes.STRING(500), allowNull: false },
  category: { type: DataTypes.STRING(50) },
});

export default Gallery;