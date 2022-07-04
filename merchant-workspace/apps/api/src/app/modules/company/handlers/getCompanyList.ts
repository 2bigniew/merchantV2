import {Request, Response} from "express";
import companyRepository from "../company-repository";

export const handler = async (req: Request, res: Response) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const companies = await companyRepository.getCompanies()

  res.status(200).json(companies)
}
