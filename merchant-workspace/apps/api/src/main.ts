import * as express from "express";
import * as socketIo from "socket.io";
import { Message } from "@merchant-workspace/api-interfaces";
import initDB from "./app/services/db/init";
import { initializeListeners } from "./socket";
import { router } from "./router";
import { fixtures } from "./app/services/db/fixtures";
import * as bodyParser from "body-parser";
import { errorHandlingMiddleware } from "./app/middleware/errorHandlingMiddleware";
import { logger } from "./app/services/logger";
import {authMiddleware} from "./app/middleware/authMiddleware";

const port = process.env.port || 3333;

const runServer = async (): Promise<void> => {
  const app = appFactory();

  try {
    await initDB.initHandler();
    await fixtures();
  } catch (error) {
    logger.error(error);
  }

  const server = app.listen(port, () => {
    logger.info("Listening at http://localhost:" + port + "/core");
  });

  server.on("error", logger.error);

  const socketServer = new socketIo.Server(server, {
    cors: {
      origin: ["http://localhost:4200"],
      credentials: true
    }
  });

  socketServer.on("connection", (socket) => {
    logger.info("Websocket connection established", socket.id);
    initializeListeners(socket);
  });
};

const appFactory = (): express.Express => {
  const app = express();

  app.use(bodyParser.json());

  app.use(authMiddleware());

  const greeting: Message = { message: "Welcome to core!" };

  app.get("/api", (req, res) => {
    res.send(greeting);
  });

  app.use("/api/v1", router);

  app.use(errorHandlingMiddleware());

  return app;
};

runServer();

/**
 *  TODO
 *  - authorization
 *  - GUS integration
 *  - client app
 *  - tests
 *  - add linter, prettier
 */
