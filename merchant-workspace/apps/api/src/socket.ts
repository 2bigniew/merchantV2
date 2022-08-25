import { Socket } from "socket.io";
import { EVENTS_NAMES } from "@merchant-workspace/api-interfaces";
import {
  COMMAND,
  COMMANDS_NAMES,
  CommandsFailuresNames,
  Command,
  CommandsNames
} from "@merchant-workspace/api-interfaces";
import EventService from "./app/services/event/eventService";

export const initializeListeners = (socket: Socket) => {
  console.log("Socket: client connected");
  console.log(socket.id);

  socket.on(COMMAND, async (args) => {
    EventService.onSocketCommandHandler(args);
  });

  socketEventsEmmiter(socket);

  socketCommandsFailuresEmitter(socket);

  socket.on("disconnect", () => {
    // TODO add user ids from socket connections instead of removing listeners
    // TODO temp - remove listeners
    console.log("Socket: client disconnected");
  });
};

const socketEventsEmmiter = (socket: Socket) => {
  for (const eventName of EVENTS_NAMES) {
    EventService.onEventSuccessHandler(socket, eventName);
  }
};

const socketCommandsFailuresEmitter = (socket: Socket) => {
  const commandFailureNames = COMMANDS_NAMES.map((name) => createFailedCommandName(name));
  for (const name of commandFailureNames) {
    EventService.onEventFailHandler(socket, name);
  }
};

const createFailedCommandName = (command: CommandsNames): CommandsFailuresNames => {
  return `${command}.failed`;
};
