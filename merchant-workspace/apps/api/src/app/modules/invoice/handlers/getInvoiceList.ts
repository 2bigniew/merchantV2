import { Request, Response } from 'express';
import invoiceRepository from '../invoice-repository';
import { Api } from '@merchant-workspace/api-interfaces';

export const handler = async (
  req: Request,
  res: Response<Api['api/v1/invoice/list']['response']>
) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const invoices = await invoiceRepository.getInvoices();

  res.status(200).json(invoices);
};
