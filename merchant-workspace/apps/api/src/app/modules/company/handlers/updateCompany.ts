import companyRepository from "../company-repository";
import { Changed, Company, UpdateCompanyPayload } from "@merchant-workspace/api-interfaces";

export const handler = async (payload: UpdateCompanyPayload): Promise<Changed<Company>> => {
  const before = await companyRepository.getCompanyById(payload.id);

  if (!before) {
    throw new Error("Company to update not found");
  }

  const after = await companyRepository.updateCompany(payload);
  return { before, after };
};
