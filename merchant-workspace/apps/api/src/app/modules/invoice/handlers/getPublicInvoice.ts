import {Request, Response} from "express";
import invoiceRepository from "../invoice-repository";
import invoicePositionRepository from "../invoice-position-repository";

export const handler = async (req: Request, res: Response) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const { invoiceId } = req.params
  const invoice = await invoiceRepository.getInvoiceById(invoiceId as unknown as number)
  const positions = await invoicePositionRepository.getInvoicePositionsByInvoiceId(
    invoiceId as unknown as number,
  )
  if (!invoice) {
    res.sendStatus(204)
  }

  res.status(200).json({ ...invoice, positions })
}
