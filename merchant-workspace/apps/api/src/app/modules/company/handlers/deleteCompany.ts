import companyRepository from "../company-repository";
import { Changed, Company } from "@merchant-workspace/api-interfaces";

export const handler = async (payload: { id: number }): Promise<Changed<Company>> => {
  const before = await companyRepository.getCompanyById(payload.id);
  if (!before) {
    throw new Error("Account to delete not found");
  }
  await companyRepository.deleteCompany(payload.id);
  return { before };
};
