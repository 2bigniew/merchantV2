import {Request, Response} from "express";
import companyRepository from "../company-repository";

export const handler = async (req: Request, res: Response) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const { companyId } = req.params
  const company = await companyRepository.getCompanyById(companyId as unknown as number)

  res.status(200).json(company)
}
