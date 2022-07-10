import * as io from 'socket.io-client';
import {
  Command,
  CommandFailure,
  Event,
  COMMANDS_TO_EVENTS,
  EVENT,
  COMMAND,
} from '@merchant-workspace/api-interfaces';

type sendCommandFunction = (
  command: Command
) => Promise<Event | CommandFailure>;

const useCommand = (): sendCommandFunction => {
  const socket = io.connect('http://127.0.0.1:3333');

  const sendCommand = async (
    command: Command
  ): Promise<Event | CommandFailure> => {
    const { success, failure } = COMMANDS_TO_EVENTS[command.name];

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        socket.off(EVENT);
        reject();
      }, 5000);

      socket.on(EVENT, (event: Event | CommandFailure) => {
        if (event.name === success) {
          clearTimeout(timeout);
          socket.off(EVENT);
          resolve(event);
        }

        if (event.name === failure) {
          clearTimeout(timeout);
          socket.off(EVENT);
          resolve(event);
        }
      });

      socket.emit(COMMAND, command);
    });
  };

  return sendCommand;
};

export default useCommand;
