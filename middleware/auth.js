const jwt = require('jsonwebtoken');

/**
 * Verifies the Bearer token on the Authorization header and attaches
 * the decoded payload ({ id, role, username }) to req.user.
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      success: false,
      message: 'Missing or malformed Authorization header. Expected: Bearer <token>',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
}

/**
 * Restricts a route to one or more roles. Use after verifyToken.
 * Example: requireRole('Admin')
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires role: ${allowedRoles.join(' or ')}`,
      });
    }
    next();
  };
}

module.exports = { verifyToken, requireRole };
