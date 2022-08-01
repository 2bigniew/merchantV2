import * as io from 'socket.io-client';
import {
  Command,
  CommandFailure,
  Event,
  COMMANDS_TO_EVENTS,
  EVENT,
  COMMAND,
} from '@merchant-workspace/api-interfaces';
import {socketConnection} from "../core/socketConnection";

type sendCommandFunction = (
  command: Command
) => Promise<Event | CommandFailure>;

const useCommand = (): sendCommandFunction => {

  const sendCommand = async (
    command: Command
  ): Promise<Event | CommandFailure> => {
    const { success, failure } = COMMANDS_TO_EVENTS[command.name];

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        socketConnection.off(EVENT);
        reject();
      }, 5000);

      socketConnection.on(EVENT, (event: Event | CommandFailure) => {
        if (event.name === success) {
          clearTimeout(timeout);
          socketConnection.off(EVENT);
          resolve(event);
        }

        if (event.name === failure) {
          clearTimeout(timeout);
          socketConnection.off(EVENT);
          resolve(event);
        }
      });

      socketConnection.emit(COMMAND, command);
    });
  };

  return sendCommand;
};

export default useCommand;
