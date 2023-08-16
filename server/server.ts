import 'express-async-errors'
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import path from 'path';

import connectDB from './db/connect';

import boardRouter from './routes/boardRoutes';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome!' });
});

app.use('/api/v1', boardRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    if (process.env.MONGO_URL) {
      await connectDB(process.env.MONGO_URL);
      app.listen(port, () => console.log(`Server is listening on port ${port}`));
    }
  } catch (err) {
    console.log(err);
  }
};

start();
