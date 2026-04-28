import User from '../models/User.js';
import Task from '../models/Task.js';

export const seedIfEmpty = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already has data, skipping seed.');
      return;
    }

    console.log('Empty database detected, seeding...');

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin',
    });

    const user = await User.create({
      name: 'John Doe',
      email: 'john@test.com',
      password: 'password123',
      role: 'user',
    });

    await Task.insertMany([
      {
        title: 'Design landing page',
        description: 'Create a responsive landing page for the new product',
        status: 'pending',
        assignedTo: user._id,
        createdBy: admin._id,
      },
      {
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated deployment',
        status: 'in-progress',
        assignedTo: user._id,
        createdBy: admin._id,
      },
      {
        title: 'Write API documentation',
        description: 'Document all REST API endpoints with examples',
        status: 'completed',
        assignedTo: user._id,
        createdBy: admin._id,
      },
      {
        title: 'Fix authentication bug',
        description: 'Users getting logged out unexpectedly after token refresh',
        status: 'in-progress',
        assignedTo: user._id,
        createdBy: admin._id,
      },
      {
        title: 'Database optimization',
        description: 'Add indexes and optimize slow queries',
        status: 'pending',
        assignedTo: user._id,
        createdBy: admin._id,
      },
    ]);

    console.log('Seed completed!');
    console.log('  Admin: admin@test.com / password123');
    console.log('  User:  john@test.com / password123');
  } catch (error) {
    console.error('Auto-seed error:', error.message);
  }
};
