import {Account, Changed, CreateAccountPayload} from "@merchant-workspace/api-interfaces";
import accountRepository from "../account-repository";

export const handler = async (payload: CreateAccountPayload): Promise<Changed<Account>> => {
  const accountId = await accountRepository.createAccount(payload)
  const after = await accountRepository.getAccountsById(accountId)
  if (!after) {
    throw new Error('Created account not found')
  }

return { after }
}
