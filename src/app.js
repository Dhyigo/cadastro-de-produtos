import express from 'express';

import productRouter from './routes/productRouter';
import userRouter from './routes/userRouter';
import tokenRouter from './routes/tokenRouter';

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
    this.app.use('/token', tokenRouter);
  }
}

export default new App().app;
