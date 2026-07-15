const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in and receive a JWT
 *     description: Authenticates against seeded demo users. Use employee1/employee123 or admin1/admin123.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: employee1
 *               password:
 *                 type: string
 *                 example: employee123
 *     responses:
 *       200:
 *         description: Login successful, returns token and user info
 *       400:
 *         description: Missing username or password
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

module.exports = router;
