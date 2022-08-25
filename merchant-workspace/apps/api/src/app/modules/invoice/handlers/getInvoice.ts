import { Request, Response } from "express";
import invoiceRepository from "../invoice-repository";
import { Api } from "@merchant-workspace/api-interfaces";

export const handler = async (req: Request, res: Response<Api["api/v1/invoice/:id"]["response"]>) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const { invoiceId } = req.params;
  const invoice = await invoiceRepository.getInvoiceById(invoiceId as unknown as number);

  res.status(200).json(invoice);
};
