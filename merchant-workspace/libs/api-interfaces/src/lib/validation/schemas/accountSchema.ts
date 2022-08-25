import * as Joi from "joi";
import { dbObjectWrapperSchema, idSchema } from "./index";

export const createAccountSchema = Joi.object({
  firstname: Joi.string().min(2).max(50).required(),
  lastname: Joi.string().min(2).max(150).required(),
  password: Joi.string().min(2).max(250).required(),
  email: Joi.string().required()
}).required();

export const updateAccountSchema = Joi.object({
  id: idSchema.required(),
  firstname: Joi.string().min(2).max(50),
  lastname: Joi.string().min(2).max(150),
  password: Joi.string().min(2).max(250),
  email: Joi.string().required()
}).required();

export const accountSchema = dbObjectWrapperSchema.concat(createAccountSchema);

export const deleteAccountSchema = Joi.object({
  id: idSchema.required()
}).required();

export const authenticationSchema = Joi.object({
  password: Joi.string().min(2).max(250),
  email: Joi.string().required()
});

export const accountSchemasToCommandMap = {
  "command.account.create": createAccountSchema,
  "command.account.update": updateAccountSchema,
  "command.account.delete": deleteAccountSchema,
  "command.account.login": authenticationSchema
};

export const accountSchemasToEventMap = {
  "event.account.created": { after: accountSchema },
  "event.account.updated": { before: accountSchema, after: accountSchema },
  "event.account.deleted": { before: accountSchema },
  "event.account.authorized": { after: accountSchema }
};
