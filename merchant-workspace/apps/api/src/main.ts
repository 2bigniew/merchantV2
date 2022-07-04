import * as express from 'express';
import * as socketIo from 'socket.io';
import { Message } from '@merchant-workspace/api-interfaces';
import initDB from './app/services/db/init';
import {initializeListeners} from "./socket";

const port = process.env.port || 3333;

const runServer = async (): Promise<void> => {
  const app = appFactory()
  // app.enableCors() // TODO on development toggle

  try {
    await initDB.initHandler()
    // await fixtures()
  } catch (e) {
    console.log(e)
  }

  const server = app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/api');
  });

  server.on('error', console.error);

  const socketServer = new socketIo.Server(server, {
    cors: {
      origin: ['http://localhost:4200'],
      credentials: true,
    },
  })

  socketServer.on('connection', (socket) => {
    initializeListeners(socket)
  })
}

const appFactory = (): express.Express => {
  const app = express();

  const greeting: Message = { message: 'Welcome to api!' };

  app.get('/api', (req, res) => {
    res.send(greeting);
  });

  return app
}

runServer()
