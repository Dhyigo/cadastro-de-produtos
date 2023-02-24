import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const port = process.env.PORT;
const connectString = process.env.CONNECTION_STRING;
mongoose.set('strictQuery', false);
mongoose.connect(connectString)
  .then(() => app.emit('connected'))
  .catch((e) => console.error(`error connecting to db: ${e}`));

app.on('connected', () => {
  app.listen(port, () => {
    console.log(`Server active http://localhost:${port}/`);
  });
});
