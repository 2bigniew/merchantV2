import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import {
  CommandAccountCreate,
  CommandAccountDelete,
  CommandAccountUpdate,
} from '@merchant-workspace/api-interfaces';
import * as getAccount from './handlers/getAccount';
import * as getAccountList from './handlers/getAccountList';
import * as createAccount from './handlers/createAccount';
import * as updateAccount from './handlers/updateAccount';
import * as deleteAccount from './handlers/deleteAccount';
import eventService from '../../services/event/eventService';

export const accountRouter = Router();

// router
accountRouter.get('/:id(\\d+)', asyncHandler(getAccount.handler));
accountRouter.get('/list', asyncHandler(getAccountList.handler));

// listener
eventService.onCommandHandler<CommandAccountCreate & { type: 'command' }>(
  'command.account.create',
  createAccount.handler
);
eventService.onCommandHandler<CommandAccountUpdate & { type: 'command' }>(
  'command.account.update',
  updateAccount.handler
);
eventService.onCommandHandler<CommandAccountDelete & { type: 'command' }>(
  'command.account.delete',
  deleteAccount.handler
);
