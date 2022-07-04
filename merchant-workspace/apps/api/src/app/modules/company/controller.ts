import { Router } from 'express'
import * as asyncHandler from 'express-async-handler'
import {CommandCompanyCreate, CommandCompanyDelete, CommandCompanyUpdate} from "@merchant-workspace/api-interfaces";
import * as getCompany from './handlers/getCompany'
import * as getCompanyList from './handlers/getCompanyList'
import * as createCompany from './handlers/createCompany'
import * as updateCompany from './handlers/updateCompany'
import * as deleteCompany from './handlers/deleteCompany'
import eventService from "../../services/event/eventService";

const router = Router()

// router
router.get('/company/:id(\\d+)', asyncHandler(getCompany.handler))
router.get('/companies', asyncHandler(getCompanyList.handler))

// listener
eventService.onCommandHandler<CommandCompanyCreate & { type: 'command' }>(
  'command.company.create',
  createCompany.handler,
)
eventService.onCommandHandler<CommandCompanyUpdate & { type: 'command' }>(
  'command.company.update',
  updateCompany.handler,
)
eventService.onCommandHandler<CommandCompanyDelete & { type: 'command' }>(
  'command.company.delete',
  deleteCompany.handler,
)
