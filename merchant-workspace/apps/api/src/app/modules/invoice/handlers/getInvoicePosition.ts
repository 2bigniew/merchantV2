import {Request, Response} from "express";
import invoicePositionRepository from "../invoice-position-repository";

export const handler = async (req: Request, res: Response) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const { positionId } = req.params
  const position = await invoicePositionRepository.getInvoiceSinglePositionById(positionId as unknown as number)

  res.status(200).json(position)
}
