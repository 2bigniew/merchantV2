import customerRepository from "../customer-repository";
import {Changed, Customer, UpdateCustomerPayload} from "@merchant-workspace/api-interfaces";

export const handler = async (payload: UpdateCustomerPayload): Promise<Changed<Customer>> => {
  const before = await customerRepository.getCustomerById(payload.id)

  if (!before) {
    throw new Error('Customer to update not found')
  }

  const after = await customerRepository.updateCustomer(payload)
  return { before, after }
}
