import companyRepository from "../company-repository";
import { Changed, Company, CreateCompanyPayload } from "@merchant-workspace/api-interfaces";

export const handler = async (payload: CreateCompanyPayload): Promise<Changed<Company>> => {
  const companyId = await companyRepository.createCompany(payload);
  const after = await companyRepository.getCompanyById(companyId);

  if (!after) {
    throw new Error("Created company not found");
  }

  return { after };
};
