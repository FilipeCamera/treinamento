import 'reflect-metadata';

import express from 'express';

import routes from './routes';

class App {
  public app: express.Application;

  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.json());
  }
  routes(){
    this.app.use(routes);
  }
}

export default new App().app;
