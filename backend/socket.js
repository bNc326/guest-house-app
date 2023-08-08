import { Server } from "socket.io";

let io;
export const initServer = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });
  return io;
};
export const getIo = () => {
  if (io) {
    return io;
  }
};

