require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./db');
const User = require('../models/User');
const Ticket = require('../models/Ticket');

async function seed() {
  await connectDB();

  await User.deleteMany({});
  await Ticket.deleteMany({});

  const employeePassword = await bcrypt.hash('employee123', 10);
  const adminPassword = await bcrypt.hash('admin123', 10);

  const employee = await User.create({
    username: 't.nombewu@uvu.africa',
    password: employeePassword,
    displayName: 'Thabiso Nombewu',
    role: 'Employee',
  });

  const admin = await User.create({
    username: 'a.mukwevho@uvu.africa',
    password: adminPassword,
    displayName: 'Admin User',
    role: 'Admin',
  });

  await Ticket.create([
    {
      title: "Laptop won't turn on",
      description: 'Held power button for 10s, no response, charger light is off too.',
      priority: 'High',
      status: 'Open',
      createdBy: employee._id,
      createdByName: employee.displayName,
    },
    {
      title: 'Need Photoshop license',
      description: 'Requesting an Adobe Photoshop license for design work on the marketing team.',
      priority: 'Low',
      status: 'In Progress',
      createdBy: employee._id,
      createdByName: employee.displayName,
    },
  ]);

  console.log('[seed] Demo users created.');
  console.log('[seed] Sample tickets created.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('[seed] Failed:', err);
  process.exit(1);
});
