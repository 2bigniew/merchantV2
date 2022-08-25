import * as bcrypt from "bcrypt";
import {Account, Changed, ConflictError, CreateAccountPayload} from "@merchant-workspace/api-interfaces";
import accountRepository from "../account-repository";

export const handler = async (payload: CreateAccountPayload): Promise<Changed<Account>> => {
  const { password: rawPassword, email, lastname, firstname } = payload;

  // TODO suppress not found
  const oldAccount = await accountRepository.getAccountByMail({ email });

  if (oldAccount) {
    throw new ConflictError(`User: ${email} already exists`);
  }

  const password = await bcrypt.hash(rawPassword, 10);

  const accountId = await accountRepository.createAccount({
    firstname,
    lastname,
    email,
    password
  });
  const after = await accountRepository.getAccountsById(accountId);

  // TODO add type PublicAccount without password

  return { after };
};
