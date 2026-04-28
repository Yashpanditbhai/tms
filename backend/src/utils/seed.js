import mongoose from 'mongoose';
import User from '../models/User.js';
import Task from '../models/Task.js';
import connectDB from '../config/db.js';

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});

    console.log('Cleared existing data.');

    // Create admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin',
    });

    // Create user
    const user = await User.create({
      name: 'John Doe',
      email: 'john@test.com',
      password: 'password123',
      role: 'user',
    });

    console.log('Created 2 users.');

    // Create 5 tasks
    const tasks = [
      {
        title: 'Design landing page',
        description: 'Create a responsive landing page for the new product',
        status: 'pending',
        assignedTo: user._id,
        createdBy: admin._id,
        dueDate: new Date('2026-05-15'),
      },
      {
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated deployment',
        status: 'in-progress',
        assignedTo: user._id,
        createdBy: admin._id,
        dueDate: new Date('2026-05-10'),
      },
      {
        title: 'Write API documentation',
        description: 'Document all REST API endpoints with examples',
        status: 'completed',
        assignedTo: user._id,
        createdBy: admin._id,
        dueDate: new Date('2026-04-30'),
      },
      {
        title: 'Fix authentication bug',
        description: 'Users getting logged out unexpectedly after token refresh',
        status: 'in-progress',
        assignedTo: user._id,
        createdBy: admin._id,
        dueDate: new Date('2026-05-05'),
      },
      {
        title: 'Database optimization',
        description: 'Add indexes and optimize slow queries',
        status: 'pending',
        assignedTo: user._id,
        createdBy: admin._id,
        dueDate: new Date('2026-05-20'),
      },
    ];

    await Task.insertMany(tasks);

    console.log('Created 5 sample tasks.');
    console.log('\nSeed completed successfully!');
    console.log('\nLogin credentials:');
    console.log('  Admin: admin@test.com / password123');
    console.log('  User:  john@test.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
