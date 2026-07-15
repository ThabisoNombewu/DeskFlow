const Ticket = require('../models/Ticket');
const { asyncHandler } = require('../middleware/errorHandler');

const PRIORITIES = ['Low', 'Medium', 'High'];
const STATUSES = ['Open', 'In Progress', 'Resolved'];

/**
 * POST /api/tickets
 * Employee-only. Creates a ticket owned by the authenticated user.
 */
const createTicket = asyncHandler(async (req, res) => {
  const { title, description, priority } = req.body;

  const errors = [];
  if (!title || title.trim().length < 3) errors.push('Title is required (min 3 characters)');
  if (!description || description.trim().length < 10) errors.push('Description is required (min 10 characters)');
  if (!priority || !PRIORITIES.includes(priority)) errors.push(`Priority must be one of: ${PRIORITIES.join(', ')}`);

  if (errors.length) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  const ticket = await Ticket.create({
    title: title.trim(),
    description: description.trim(),
    priority,
    createdBy: req.user.id,
    createdByName: req.user.displayName,
  });

  res.status(201).json({ success: true, ticket });
});

/**
 * GET /api/tickets
 * Employees see only their own tickets; Admins see every ticket.
 * Supports optional ?status= and ?priority= filters for either role.
 */
const getTickets = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.user.role === 'Employee') {
    filter.createdBy = req.user.id;
  }

  if (req.query.status) {
    if (!STATUSES.includes(req.query.status)) {
      return res.status(400).json({ success: false, message: `status filter must be one of: ${STATUSES.join(', ')}` });
    }
    filter.status = req.query.status;
  }

  if (req.query.priority) {
    if (!PRIORITIES.includes(req.query.priority)) {
      return res.status(400).json({ success: false, message: `priority filter must be one of: ${PRIORITIES.join(', ')}` });
    }
    filter.priority = req.query.priority;
  }

  const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: tickets.length, tickets });
});

/**
 * PUT /api/tickets/:id
 * Admin-only. Updates a ticket's status.
 */
const updateTicketStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status || !STATUSES.includes(status)) {
    return res.status(400).json({ success: false, message: `status is required and must be one of: ${STATUSES.join(', ')}` });
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return res.status(404).json({ success: false, message: 'Ticket not found' });
  }

  ticket.status = status;
  await ticket.save();

  res.status(200).json({ success: true, ticket });
});

module.exports = { createTicket, getTickets, updateTicketStatus };
