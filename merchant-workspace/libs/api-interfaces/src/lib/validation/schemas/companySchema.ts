import * as Joi from 'joi'
import { dbObjectWrapperSchema, idSchema } from './index'

export const createCompanySchema = Joi.object({
  accountId: idSchema.required(),
  name: Joi.string().max(300).required(),
  street: Joi.string().max(300).required(),
  buldingNumber: Joi.string().max(10),
  locality: Joi.string().max(10),
  postalCode: Joi.string().max(10).required(),
  city: Joi.string().max(100).required(),
  country: Joi.string().max(100).required(),
  nip: Joi.string().max(10).alphanum().required(),
  bankAccount: Joi.string().max(26).required(),
  bankName: Joi.string().max(300),
})

export const updateCompanySchema = Joi.object({
  id: idSchema.required(),
  accountId: idSchema,
  name: Joi.string().max(300),
  street: Joi.string().max(300),
  buldingNumber: Joi.string().max(10),
  locality: Joi.string().max(10),
  postalCode: Joi.string().max(10),
  city: Joi.string().max(100),
  country: Joi.string().max(100),
  nip: Joi.string().max(10).alphanum(),
  bankAccount: Joi.string().max(26),
  bankName: Joi.string().max(300),
})

export const deleteCompanySchema = Joi.object({
  id: idSchema.required(),
})

export const companySchema = createCompanySchema.concat(dbObjectWrapperSchema)

export const companySchemasToCommandMap = {
  'command.company.create': createCompanySchema,
  'command.company.update': updateCompanySchema,
  'command.company.delete': deleteCompanySchema,
}

export const companySchemasToEventMap = {
  'event.company.created': { after: companySchema },
  'event.company.updated': { before: companySchema, after: companySchema },
  'event.company.deleted': { after: companySchema },
}
