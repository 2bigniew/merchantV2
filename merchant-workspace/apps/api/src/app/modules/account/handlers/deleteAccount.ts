import {Account, Changed } from "@merchant-workspace/api-interfaces";
import accountRepository from "../account-repository";

export const handler = async (payload: { id: number }): Promise<Changed<Account>> => {
  const before = await accountRepository.getAccountsById(payload.id)
  if (!before) {
    throw new Error('Account to delete not found')
  }
  await accountRepository.deleteAccount(payload.id)
  return { before }
}

