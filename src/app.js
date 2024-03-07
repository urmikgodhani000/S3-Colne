import express from 'express';
import cors from 'cors';

import HttpError from './utils/HttpError.js';
import userRoutes from './routes/user.js';
import bucketRoutes from './routes/bucket.js';
import objectsRoutes from './routes/object.js';
import errorMiddleware from './middlewares/error.js';

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

router.use('/users', userRoutes);
router.use('/buckets', bucketRoutes);
router.use('/objects', objectsRoutes);

app.use('*', (req, res, next) => {
  return next(new HttpError(404, { message: `Can't find ${req.originalUrl} on this server!` }));
});

app.use(errorMiddleware);

export default app;
