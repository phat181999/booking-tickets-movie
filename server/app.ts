import express from "express";
import bodyParser from "body-parser";

class App {
  public app: express.Application;
  // public router:

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  constructor() {
    this.app = express();

    this.config();
  }
}

export default new App().app;
