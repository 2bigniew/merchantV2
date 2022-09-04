import { Account, Changed, NotFoundError } from "@merchant-workspace/api-interfaces";
import accountRepository from "../account-repository";

export const handler = async (payload: { id: number }): Promise<Changed<Account>> => {
  const before = await accountRepository.getAccountsById(payload.id);
  if (!before) {
    throw new NotFoundError(`Account ${payload.id} not found`);
  }
  await accountRepository.deleteAccount(payload.id);
  return { before };
};
