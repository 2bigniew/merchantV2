import {Changed, CreateCustomerPayload, Customer} from "@merchant-workspace/api-interfaces";
import customerRepository from "../customer-repository";

export const handler = async (payload: CreateCustomerPayload): Promise<Changed<Customer>> => {
  const customerId = await customerRepository.createCustomer(payload)
  const after = await customerRepository.getCustomerById(customerId)

  if (!after) {
    throw new Error('Created customer not found')
  }

  return { after }
}
