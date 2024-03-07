import express from 'express';

import { createBucket, getAllBuckets } from '../controllers/bucket.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.use(auth);

router.route('/').post(createBucket);
router.route('/').get(getAllBuckets);

export default router;
