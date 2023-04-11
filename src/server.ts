import http from "http";
import express, { Application } from "express";
import helmet from "helmet";
import config from "./config/config";
import routes from "./routes";
// import ErrorHandler from './helpers/ErrorHandler';

// import { CreateUserController } from './controllers/users.controller';

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json({ limit: "50mb" }));

    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Content-type", "application/json");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      next();
    });
  }

  private applyingRoutes() {
    console.log("<<< Applying routes >>>");
    //  To move this into router files
    this.app.use("/api", routes);

    // this.app.use(ErrorHandler);

    console.log("<<< Routes applied successfully >>>");
  }

  start() {
    const httpServer = http.createServer(this.app);

    this.applyingRoutes();
    httpServer.listen(config.server.port, () => console.log(`Server running on port ${config.server.hostname}:${config.server.port}`));
  }
}
