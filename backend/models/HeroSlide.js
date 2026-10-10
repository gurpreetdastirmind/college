import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const HeroSlide = sequelize.define(
  'HeroSlide',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cta_label: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Apply Online Now',
    },
    cta_link: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '/admissions/apply',
    },
    cta2_label: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'View Courses',
    },
    cta2_link: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '/courses',
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'hero_slides',
  }
);

export default HeroSlide;