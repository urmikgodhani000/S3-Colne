import mongoose from 'mongoose';

import app from './app.js';

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_CONNECTION_URL || 'mongodb://127.0.0.1:27017';

mongoose
  .connect(DB_URL)
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Error connecting database: ', err));

app.listen(+PORT, async () => {
  console.log(`Server is listening to PORT: ${PORT}`);
});
