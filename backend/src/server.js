import app from './app.js';
import connectDB from './config/db.js';
import env from './config/env.js';
import { seedIfEmpty } from './utils/autoSeed.js';

const startServer = async () => {
  await connectDB();
  await seedIfEmpty();

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });
};

startServer();
