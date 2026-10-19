import express from 'express';
import cors from 'cors';
import { connectMongo } from './db/mongo.db';
import reservationRoutes from './routes/reservation.routes';
import { errorHandler } from './middlewares/error.middleware';
import { ENV } from './config/env.config';

const bootstrap = async () => {
  await connectMongo();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/reservations', reservationRoutes);
  app.use(errorHandler);
  app.listen(ENV.PORT, () => {
    console.log(`API on PORT:${ENV.PORT}`);
  });
};

bootstrap().catch((err) => {
  console.error('Failed to start the application: ', err);
  process.exit(1);
});
