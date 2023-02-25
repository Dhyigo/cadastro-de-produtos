import express from 'express';

import productRouter from './routes/productRouter';
import userRouter from './routes/userRouter';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/produto', productRouter);
    this.app.use('/usuario', userRouter);
  }
}

export default new App().app;
