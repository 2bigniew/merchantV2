import * as express from "express";
import * as socketIo from "socket.io";
import { Message } from "@merchant-workspace/api-interfaces";
import initDB from "./app/services/db/init";
import { initializeListeners } from "./socket";
import { router } from "./router";
import { fixtures } from "./app/services/db/fixtures";
import * as bodyParser from "body-parser";
import { handleError } from "./app/middleware/errorHandlingMiddleware";

const port = process.env.port || 3333;

const runServer = async (): Promise<void> => {
  const app = appFactory();

  try {
    await initDB.initHandler();
    await fixtures();
  } catch (e) {
    console.log(e);
  }

  const server = app.listen(port, () => {
    console.log("Listening at http://localhost:" + port + "/core");
  });

  server.on("error", console.error);

  const socketServer = new socketIo.Server(server, {
    cors: {
      origin: ["http://localhost:4200"],
      credentials: true
    }
  });

  socketServer.on("connection", (socket) => {
    console.log("CONNECTION");
    initializeListeners(socket);
  });
};

const appFactory = (): express.Express => {
  const app = express();

  app.use(bodyParser.json());

  const greeting: Message = { message: "Welcome to core!" };

  app.get("/api", (req, res) => {
    res.send(greeting);
  });

  app.use("/api/v1", router);

  app.use(handleError());

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
