import { Request, Response } from "express";
import invoicePositionRepository from "../invoice-position-repository";
import { Api } from "@merchant-workspace/api-interfaces";

export const handler = async (req: Request, res: Response<Api["api/v1/invoice/invoice-position/:id"]["response"]>) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const { positionId } = req.params;
  const position = await invoicePositionRepository.getInvoiceSinglePositionById(positionId as unknown as number);

  res.status(200).json(position);
};
