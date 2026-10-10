import jwt from 'jsonwebtoken';

/**
 * Generate JWT token for a user
 * @param {Object} user - User instance or {id, email, role}
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );
};

/**
 * Verify a JWT token
 * @param {string} token
 * @returns {Object|null} decoded payload or null
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};

/**
 * Decode without verification (for debugging)
 */
export const decodeToken = (token) => jwt.decode(token);

export default generateToken;