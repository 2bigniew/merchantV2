import {Request, Response} from "express";
import invoiceRepository from "../invoice-repository";

export const handler = async (req: Request, res: Response) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const invoices = await invoiceRepository.getInvoices()

  res.status(200).json(invoices)
}
