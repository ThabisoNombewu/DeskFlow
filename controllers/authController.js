const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * POST /api/auth/login
 * Body: { username, password }
 * Simulates authentication against seeded users and returns a signed JWT.
 */
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'username and password are required' });
  }

  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role, displayName: user.displayName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  );

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
    },
  });
});

module.exports = { login };
