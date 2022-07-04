import {Request, Response} from "express";
import invoiceRepository from "../invoice-repository";

export const handler = async (req: Request, res: Response) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const { invoiceId } = req.params
  const invoice = await invoiceRepository.getInvoiceById(invoiceId as unknown as number)

  res.status(200).json(invoice)
}
