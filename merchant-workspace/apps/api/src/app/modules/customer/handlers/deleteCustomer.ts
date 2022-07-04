import {Changed, Customer} from "@merchant-workspace/api-interfaces";
import customerRepository from "../customer-repository";

export const handler = async (payload: { id: number }): Promise<Changed<Customer>> => {
  const before = await customerRepository.getCustomerById(payload.id)
  if (!before) {
    throw new Error('Customer to delete not found')
  }
  await customerRepository.deleteCustomer(payload.id)
  return { before }
}
