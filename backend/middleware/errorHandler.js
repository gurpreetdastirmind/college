/**
 * 404 Not Found handler
 * Use AFTER all routes, BEFORE errorHandler
 */
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

/**
 * Global error handler
 * Use LAST in middleware chain
 */
export const errorHandler = (err, req, res, next) => {
  // Log in dev
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
  }

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(', ');
  }

  // Sequelize unique constraint
  if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    message = `Duplicate entry: ${err.errors[0]?.value} already exists.`;
  }

  // Sequelize DB error
  if (err.name === 'SequelizeDatabaseError') {
    statusCode = 400;
    message = 'Database error: invalid query or data.';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token.';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired.';
  }

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'File too large .';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * Wrap async controllers to auto-catch errors
 * Usage: router.get('/', asyncHandler(async (req,res) => {...}))
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);