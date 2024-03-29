import { Account, Changed, NotFoundError, UpdateAccountPayload } from "@merchant-workspace/api-interfaces";
import accountRepository from "../account-repository";

export const handler = async (payload: UpdateAccountPayload): Promise<Changed<Account>> => {
  const before = await accountRepository.getAccountsById(payload.id);
  if (!before) {
    throw new NotFoundError(`Account ${payload.id} not found`);
  }
  const after = await accountRepository.updateAccount(payload);
  return { before, after };
};
