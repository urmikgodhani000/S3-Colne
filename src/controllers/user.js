import User from '../models/user.js';
import HttpError from '../utils/HttpError.js';
import HttpRes from '../utils/HttpRes.js';

import signToken from '../utils/signToken.js';
import { loginUserSchema, registerUserSchema } from '../validators/user.js';

export async function register(req, res, next) {
  try {
    if (!registerUserSchema(req.body)) throw new HttpError(400, registerUserSchema.errors);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = signToken(user._id);

    user.password = undefined;

    const response = new HttpRes(201, { token, user });
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    if (!loginUserSchema(req.body)) throw new HttpError(400, loginUserSchema.errors);

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new HttpError(401, 'Incorrect email or password!'));
    }

    const token = signToken(user._id);

    const response = new HttpRes(200, { token, user });
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
}
