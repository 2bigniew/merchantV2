import * as io from "socket.io-client";
import {
  Command,
  CommandFailure,
  Event,
  COMMANDS_TO_EVENTS,
  EVENT,
  COMMAND,
  COMMAND_FAILURE
} from "@merchant-workspace/api-interfaces";
import { socketConnection } from "../core/socketConnection";

type sendCommandFunction = (command: Command) => Promise<Event>;

const useCommand = (): sendCommandFunction => {
  const sendCommand = async (command: Command): Promise<Event> => {
    const { success, failure } = COMMANDS_TO_EVENTS[command.name];

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        // socketConnection.off(EVENT);
        reject();
      }, 5000);

      socketConnection.on(EVENT, (event: Event) => {
        if (event.name === success) {
          clearTimeout(timeout);
          // socketConnection.off(EVENT);
          resolve(event);
        }
      });

      socketConnection.on(COMMAND_FAILURE, (commandFailure: CommandFailure) => {
        if (commandFailure.name === failure) {
          clearTimeout(timeout);
          // socketConnection.off(EVENT);
          reject(commandFailure);
        }
      });

      socketConnection.emit(COMMAND, command);
    });
  };

  return sendCommand;
};

export default useCommand;
