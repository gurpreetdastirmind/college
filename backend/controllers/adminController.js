import { Admission, Course, Notification, Faculty, User } from '../models/index.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [admissions, courses, notifications, faculty] = await Promise.all([
    Admission.count(),
    Course.count(),
    Notification.count(),
    Faculty.count(),
  ]);

  res.json({
    success: true,
    stats: { admissions, courses, notifications, faculty },
  });
});