import sequelize from '../config/db.js';
import User from './User.js';
import Course from './Course.js';
import Department from './Department.js';
import Faculty from './Faculty.js';
import Notification from './Notification.js';
import Admission from './Admission.js';
import Result from './Result.js';
import Gallery from './Gallery.js';
import Message from './Message.js';
import Committee from './Committee.js';
import Placement from './Placement.js';
import Alumni from './Alumni.js';
import HeroSlide from './HeroSlide.js';
import AcademicResource from './AcademicResource.js';
import CommitteeMember from './CommitteeMember.js';
import Prospectus from './Prospectus.js';
import Activity from './Activity.js'; 

// Associations
Admission.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });
Course.hasMany(Admission, { foreignKey: 'course_id' });

Result.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });
Course.hasMany(Result, { foreignKey: 'course_id' });

Department.hasMany(Faculty, { foreignKey: 'dept_id' });
Faculty.belongsTo(Department, { foreignKey: 'dept_id' });

export {
  sequelize,
  User,
  Course,
  Department,
  Faculty,
  Notification,
  Admission,
  Result,
  Gallery,
  Message,
  Committee,
  Placement,
  Alumni,
  HeroSlide,
  CommitteeMember,
  AcademicResource,
  Prospectus,
  Activity, 
};