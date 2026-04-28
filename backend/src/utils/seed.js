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

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin',
    });

    // Create regular users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@test.com',
      password: 'password123',
      role: 'user',
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@test.com',
      password: 'password123',
      role: 'user',
    });

    const user3 = await User.create({
      name: 'Bob Wilson',
      email: 'bob@test.com',
      password: 'password123',
      role: 'user',
    });

    console.log('Created users.');

    const users = [user1, user2, user3];

    // Create sample tasks
    const tasks = [
      {
        title: 'Design landing page',
        description: 'Create a responsive landing page design for the new product',
        status: 'pending',
        assignedTo: user1._id,
        createdBy: admin._id,
        dueDate: new Date('2026-05-15'),
      },
      {
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated testing and deployment',
        status: 'in-progress',
        assignedTo: user2._id,
        createdBy: admin._id,
        dueDate: new Date('2026-05-10'),
      },
      {
        title: 'Write API documentation',
        description: 'Document all REST API endpoints with examples',
        status: 'completed',
        assignedTo: user1._id,
        createdBy: admin._id,
        dueDate: new Date('2026-04-30'),
      },
      {
        title: 'Fix authentication bug',
        description: 'Users are getting logged out unexpectedly after token refresh',
        status: 'in-progress',
        assignedTo: user3._id,
        createdBy: admin._id,
        dueDate: new Date('2026-05-05'),
      },
      {
        title: 'Database optimization',
        description: 'Add indexes and optimize slow queries in the task collection',
        status: 'pending',
        assignedTo: user2._id,
        createdBy: admin._id,
        dueDate: new Date('2026-05-20'),
      },
      {
        title: 'User feedback integration',
        description: 'Implement in-app feedback collection system',
        status: 'pending',
        assignedTo: user3._id,
        createdBy: admin._id,
        dueDate: new Date('2026-05-25'),
      },
      {
        title: 'Unit tests for task service',
        description: 'Write comprehensive unit tests for the task service layer',
        status: 'in-progress',
        assignedTo: user1._id,
        createdBy: admin._id,
        dueDate: new Date('2026-05-12'),
      },
      {
        title: 'Implement email notifications',
        description: 'Send email notifications when tasks are assigned or status changes',
        status: 'pending',
        assignedTo: user2._id,
        createdBy: admin._id,
        dueDate: new Date('2026-06-01'),
      },
      {
        title: 'Mobile responsive dashboard',
        description: 'Make the admin dashboard fully responsive for mobile devices',
        status: 'completed',
        assignedTo: user3._id,
        createdBy: admin._id,
        dueDate: new Date('2026-04-25'),
      },
      {
        title: 'Security audit',
        description: 'Perform a comprehensive security audit of the application',
        status: 'pending',
        assignedTo: user1._id,
        createdBy: admin._id,
        dueDate: new Date('2026-06-10'),
      },
      {
        title: 'Performance profiling',
        description: 'Profile and optimize frontend bundle size and load times',
        status: 'in-progress',
        assignedTo: user2._id,
        createdBy: admin._id,
      },
      {
        title: 'Data export feature',
        description: 'Allow users to export their task data as CSV or PDF',
        status: 'pending',
        assignedTo: user3._id,
        createdBy: admin._id,
        dueDate: new Date('2026-06-15'),
      },
    ];

    await Task.insertMany(tasks);

    console.log('Created 12 sample tasks.');
    console.log('\nSeed completed successfully!');
    console.log('\nLogin credentials:');
    console.log('  Admin: admin@test.com / password123');
    console.log('  User1: john@test.com / password123');
    console.log('  User2: jane@test.com / password123');
    console.log('  User3: bob@test.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
