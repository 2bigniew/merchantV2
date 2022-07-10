import { Request, Response } from 'express';
import companyRepository from '../company-repository';
import { Api } from '@merchant-workspace/api-interfaces';

export const handler = async (
  req: Request,
  res: Response<Api['api/v1/company/list']['response']>
) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const companies = await companyRepository.getCompanies();

  res.status(200).json(companies);
};
