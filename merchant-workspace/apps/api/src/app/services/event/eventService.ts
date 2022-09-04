import { EVENT, EventsNames, Event } from "@merchant-workspace/api-interfaces";
import { validateCommand, validateEvent, validateSchema } from "@merchant-workspace/api-interfaces";
import * as EventEmitter from "events";
import {
  Command,
  COMMAND_FAILURE,
  CommandFailure,
  COMMANDS_TO_EVENTS,
  CommandsFailuresNames,
  CommandListenerRespone,
  schemas
} from "@merchant-workspace/api-interfaces";
import { Socket } from "socket.io";
import { getListenersCountForEvents, LISTENERS_COUNT_FOR_EVENTS, ListenersCountForEvents } from "./helpers";
import * as Logger from "bunyan";
import { createLogger } from "bunyan";

export class EventService {
  listenersCountsForEvents: Partial<ListenersCountForEvents>;
  // TODO add logger: private readonly logger = new Logger('EventService')
  // TODO add error handling
  // TODO REWRITE

  private readonly logger: Logger;

  constructor(private readonly broker: EventEmitter) {
    this.logger = createLogger({
      name: EventService.name
    });
    this.listenersCountsForEvents = {
      ...getListenersCountForEvents(),
      ...LISTENERS_COUNT_FOR_EVENTS
    };
    this.broker.setMaxListeners(60);
  }

  public onSocketCommandHandler = (args: any) => {
    const command = this.prepareCommand(args);

    if (command) {
      this.emitCommand(command);
    }
  };

  public onCommandHandler<T extends Command>(
    commandName: T["name"],
    callback: (payload: T["payload"]) => Promise<CommandListenerRespone<T["name"]>>
  ): void {
    const { success, failure } = COMMANDS_TO_EVENTS[commandName];

    this.broker.addListener(commandName, async (payload: T["payload"]) => {
      try {
        const response = await callback(payload);
        this.broker.emit(success, response);
      } catch (error) {
        this.logger.error(error);
        this.broker.emit(failure, error);
      }
    });
  }

  public onEventSuccessHandler(socket: Socket, eventName: EventsNames): void {
    const listenersLimit = this.listenersCountsForEvents[eventName] || 1;
    if (this.broker.listenerCount(eventName) >= listenersLimit) {
      // TODO TEMP - find better solution
      this.logger.trace(`Listeners for ${eventName} was already declared`);
      return;
    }

    this.broker.addListener(eventName, (payload: any) => {
      const event = this.prepareEvent({
        type: EVENT,
        name: eventName,
        payload
      });

      if (event) {
        this.logger.trace(event);
        this.emitSocketEvent(socket, event);
      }
    });
  }

  public onEventFailHandler(socket: Socket, commandFailureName: CommandsFailuresNames): void {
    this.broker.addListener(commandFailureName, (payload: any) => {
      const commandFailure = {
        type: COMMAND_FAILURE,
        name: commandFailureName,
        payload
      };
      this.emitSocketEvent(socket, commandFailure);
    });
  }

  private emitSocketEvent(socket: Socket, socketEvent: Event | CommandFailure) {
    try {
      socket.emit(socketEvent.type, socketEvent);
      this.logger.trace(`Socket event emitted, type: ${socketEvent.type}, name: ${socketEvent.name}`);
    } catch (e) {
      this.logger.error(e);
    }
  }

  private prepareCommand(args: any): Command | undefined {
    const { name, payload } = args;
    const commandName = validateSchema(name, schemas.main.commandTypeSchema);
    const { failure } = COMMANDS_TO_EVENTS[commandName];
    try {
      return validateCommand(commandName, payload);
    } catch (error) {
      this.logger.error(error);
      this.broker.emit(failure, error);
      return;
    }
  }

  private prepareEvent(args: any): Event | undefined {
    const { name, payload } = args;
    const eventName = validateSchema(name, schemas.main.eventTypeSchema);
    let failure: CommandsFailuresNames;

    for (const { success, failure: failureName } of Object.values(COMMANDS_TO_EVENTS)) {
      if (eventName === success) {
        failure = failureName;
      }
    }

    try {
      return validateEvent(eventName, payload);
    } catch (error) {
      this.logger.error(error);

      if (failure) {
        this.broker.emit(failure, error);
      }
      return;
    }
  }

  private emitCommand(command: Command): void {
    this.broker.emit(command.name, command.payload);
    this.logger.trace(`Command: ${command.name} succeed`);
  }
}

export default new EventService(new EventEmitter());
