const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const { createTicket, getTickets, updateTicketStatus } = require('../controllers/ticketController');

/**
 * @openapi
 * /api/tickets:
 *   post:
 *     tags: [Tickets]
 *     summary: Create a new IT service ticket (Employee)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, priority]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Laptop won't turn on
 *               description:
 *                 type: string
 *                 example: Held power button for 10s, no response, charger light is off too.
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 example: High
 *     responses:
 *       201:
 *         description: Ticket created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Missing/invalid token
 *       403:
 *         description: Only Employees may create tickets
 *   get:
 *     tags: [Tickets]
 *     summary: List tickets (own tickets for Employee, all tickets for Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Open, In Progress, Resolved]
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [Low, Medium, High]
 *     responses:
 *       200:
 *         description: List of tickets
 *       401:
 *         description: Missing/invalid token
 */
router.post('/', verifyToken, requireRole('Employee'), createTicket);
router.get('/', verifyToken, requireRole('Employee', 'Admin'), getTickets);

/**
 * @openapi
 * /api/tickets/{id}:
 *   put:
 *     tags: [Tickets]
 *     summary: Update a ticket's status (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Open, In Progress, Resolved]
 *     responses:
 *       200:
 *         description: Ticket updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Missing/invalid token
 *       403:
 *         description: Only Admins may update ticket status
 *       404:
 *         description: Ticket not found
 */
router.put('/:id', verifyToken, requireRole('Admin'), updateTicketStatus);

module.exports = router;
