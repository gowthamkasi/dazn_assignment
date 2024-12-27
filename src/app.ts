import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import movieRouter from './movie/movie.routes';
import { connectDB } from './config/db';

config();

export const app = express();
const port = process.env.PORT || 3000;

const expressErrorHandler = (
  err: Error,
  _req: express.Request,
  res: express.Response
) => {
  console.error(err.stack);
  res.status(400).send(err.message);
};

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: 'You have exceeded the 100 requests in 60 seconds limit!',
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(express.json({ limit: '1024kb' }));

app.use(helmet());
app.use(cors({ origin: true }));

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/movie-lobby', movieRouter);

app.use('/', (req, res) => {
  console.log('Inside 404 Error Route');
  res.status(404).send('404 Page Not Found!');
});

// Express Error Handler
app.use(expressErrorHandler);

app.listen(port, async () => {
  console.info(`Server is running at ${port}`);

  if (process.env.TEST_ENV !== 'true') await connectDB();
});
