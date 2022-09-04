import {
  Api,
  validateSchema,
  schemas,
  AuthPayload,
  AuthenticationError,
  NotFoundError
} from "@merchant-workspace/api-interfaces";
import accountRepository from "../account-repository";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const handler = async (
  req: Request,
  res: Response<Api["api/v1/account/authentication"]["response"] | string>
): Promise<void> => {
  const { email, password } = validateSchema<AuthPayload>(req.body, schemas.account.authenticationSchema);
  const account = await accountRepository.getAccountByMail({
    email
  });

  if (!account) {
    throw new NotFoundError(`Account ${email} not found`);
  }

  const isPasswordValid = await bcrypt.compare(password, account.password);

  if (!isPasswordValid) {
    throw new AuthenticationError(`Invalid password for user: ${email}`);
  }

  // TODO add secret

  const token = jwt.sign({ userId: account.id, email: account.email }, "secret", {
    expiresIn: "2h"
  });

  res.status(201).json({ ...account, token });
};
