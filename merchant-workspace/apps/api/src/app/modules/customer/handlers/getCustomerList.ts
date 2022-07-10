import { Request, Response } from 'express';
import customerRepository from '../customer-repository';
import { Api } from '@merchant-workspace/api-interfaces';

export const handler = async (
  req: Request,
  res: Response<Api['api/v1/customer/list']['response']>
) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const customers = await customerRepository.getCustomers();

  res.status(200).json(customers);
};
