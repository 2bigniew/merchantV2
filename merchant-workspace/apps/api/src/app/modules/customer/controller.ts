import { Router } from "express";
import * as asyncHandler from "express-async-handler";
import {
  CommandCustomerCreate,
  CommandCustomerDelete,
  CommandCustomerUpdate
} from "@merchant-workspace/api-interfaces";
import * as getCustomer from "./handlers/getCustomer";
import * as getCustomerList from "./handlers/getCustomerList";
import * as createCustomer from "./handlers/createCustomer";
import * as updateCustomer from "./handlers/updateCustomer";
import * as deleteCustomer from "./handlers/deleteCustomer";
import eventService from "../../services/event/eventService";

export const customerRouter = Router();

// router
customerRouter.get("/:id(\\d+)", asyncHandler(getCustomer.handler));
customerRouter.get("/list", asyncHandler(getCustomerList.handler));

// listener
eventService.onCommandHandler<CommandCustomerCreate & { type: "command" }>(
  "command.customer.create",
  createCustomer.handler
);
eventService.onCommandHandler<CommandCustomerUpdate & { type: "command" }>(
  "command.customer.update",
  updateCustomer.handler
);
eventService.onCommandHandler<CommandCustomerDelete & { type: "command" }>(
  "command.customer.delete",
  deleteCustomer.handler
);
