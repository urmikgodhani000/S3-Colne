import HttpError from '../utils/HttpError.js';

function errorMiddleware(error, _req, res, _next) {
  console.error(error);

  if (error instanceof HttpError) return res.status(error.status).send(error);

  if (error.code === 11000) {
    const value = error.message.match(/(["'])(\\?.)*?\1/)[0];
    const message = `${value}: already exist!`;
    return res.status(400).send(new HttpError(400, { message }));
  }

  return res.status(500).send(new HttpError(500, error));
}

export default errorMiddleware;
