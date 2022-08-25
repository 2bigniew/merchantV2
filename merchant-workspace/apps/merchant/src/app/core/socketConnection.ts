import * as io from "socket.io-client";

const socketConnectionFactory = (): io.Socket => {
  const socket = io.connect("http://127.0.0.1:3333", {
    reconnection: true,
    reconnectionAttempts: 5
  });

  return socket;
};

export const socketConnection = socketConnectionFactory();
