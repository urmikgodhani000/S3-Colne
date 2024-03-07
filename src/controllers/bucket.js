import Bucket from '../models/bucket.js';
import HttpError from '../utils/HttpError.js';
import HttpRes from '../utils/HttpRes.js';
import { createBucketSchema } from '../validators/bucket.js';

export async function createBucket(req, res, next) {
  try {
    if (!createBucketSchema(req.body)) throw new HttpError(400, createBucketSchema.errors);

    const bucket = await Bucket.create({
      name: req.body.name,
      user: res.locals.user._id,
    });

    const response = new HttpRes(201, bucket);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
}

export async function getAllBuckets(req, res, next) {
  try {
    const buckets = await Bucket.find({ user: res.locals.user._id }, { _id: 1, name: 1 });

    const response = new HttpRes(200, buckets);
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
}
