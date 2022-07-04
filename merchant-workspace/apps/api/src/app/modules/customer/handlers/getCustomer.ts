import {Request, Response} from "express";
import customerRepository from "../customer-repository";

export const handler = async (req: Request, res: Response) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const { customerId } = req.params
  const customer = await customerRepository.getCustomerById(customerId as unknown as number)

  res.status(200).json(customer)
}
