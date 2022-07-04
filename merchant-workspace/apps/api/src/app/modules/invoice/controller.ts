import { Router } from 'express'
import * as asyncHandler from 'express-async-handler'
import * as getInvoice from './handlers/getInvoice'
import * as getPublicInvoice from './handlers/getPublicInvoice'
import * as getInvoiceList from './handlers/getInvoiceList'
import * as getInvoicePosition from './handlers/getInvoicePosition'
import * as createInvoice from './handlers/createInvoice'
import * as updateInvoice from './handlers/updateInvoice'
import * as deleteInvoice from './handlers/deleteInvoice'
import * as createInvoicePosition from './handlers/createInvoicePosition'
import * as updateInvoicePosition from './handlers/updateInvoicePosition'
import * as deleteInvoicePosition from './handlers/deleteInvoicePosition'
import eventService from "../../services/event/eventService";
import {
  CommandInvoiceCreate,
  CommandInvoiceDelete,
  CommandInvoicePositionCreate, CommandInvoicePositionDelete, CommandInvoicePositionUpdate,
  CommandInvoiceUpdate
} from "@merchant-workspace/api-interfaces";

const router = Router()

// router
router.get('/invoice/:id(\\d+)', asyncHandler(getInvoice.handler))
router.get('/public/invoice/:id(\\d+)', asyncHandler(getPublicInvoice.handler))
router.get('/invoices', asyncHandler(getInvoiceList.handler))
router.get('/invoice-position/:id(\\d+)', getInvoicePosition.handler)

// listener
eventService.onCommandHandler<CommandInvoiceCreate & { type: 'command' }>(
  'command.invoice.create',
  createInvoice.handler,
)
eventService.onCommandHandler<CommandInvoiceUpdate & { type: 'command' }>(
  'command.invoice.update',
  updateInvoice.handler,
)
eventService.onCommandHandler<CommandInvoiceDelete & { type: 'command' }>(
  'command.invoice.delete',
  deleteInvoice.handler,
)
eventService.onCommandHandler<CommandInvoicePositionCreate & { type: 'command' }>(
  'command.invoicePosition.create',
  createInvoicePosition.handler,
)
eventService.onCommandHandler<CommandInvoicePositionUpdate & { type: 'command' }>(
  'command.invoicePosition.update',
  updateInvoicePosition.handler,
)
eventService.onCommandHandler<CommandInvoicePositionDelete & { type: 'command' }>(
  'command.invoicePosition.delete',
  deleteInvoicePosition.handler,
)
