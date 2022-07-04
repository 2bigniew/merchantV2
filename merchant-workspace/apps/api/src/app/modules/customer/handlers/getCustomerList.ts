import {Request, Response} from "express";
import customerRepository from "../customer-repository";

export const handler = async (req: Request, res: Response) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const customers = await customerRepository.getCustomers()

  res.status(200).json(customers)
}
