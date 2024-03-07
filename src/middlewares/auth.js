import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import HttpError from '../utils/HttpError.js';
import User from '../models/user.js';

export default async function auth(req, res, next) {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new HttpError(401, { message: 'You are not logged in! Please log in to get access.' })
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new HttpError(401, { message: 'The user belonging to this token does no longer exist.' })
      );
    }

    res.locals.user = currentUser;
    next();
  } catch (error) {
    return next(error);
  }
}
