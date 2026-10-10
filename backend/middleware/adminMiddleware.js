/**
 * Restrict route to admin role only
 * MUST be used AFTER `protect` middleware
 * Usage: router.post('/', protect, admin, controller)
 */
export const admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated.',
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    });
  }

  next();
};

/**
 * Restrict to specific roles
 * Usage: router.post('/', protect, authorize('admin', 'faculty'), controller)
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not allowed to access this route.`,
      });
    }

    next();
  };
};

/**
 * Check if user owns the resource OR is admin
 * Expects req.user.id and req.params.userId
 */
export const ownerOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  }

  if (req.user.role === 'admin' || req.user.id === parseInt(req.params.userId)) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Not authorized to access this resource.',
  });
};