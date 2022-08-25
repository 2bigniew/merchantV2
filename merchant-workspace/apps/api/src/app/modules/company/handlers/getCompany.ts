import { Request, Response } from "express";
import companyRepository from "../company-repository";
import { Api } from "@merchant-workspace/api-interfaces";

export const handler = async (req: Request, res: Response<Api["api/v1/company/:id"]["response"]>) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const { companyId } = req.params;
  const company = await companyRepository.getCompanyById(companyId as unknown as number);

  res.status(200).json(company);
};
