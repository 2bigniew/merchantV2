import {Account, Changed, CreateAccountPayload, AuthPayload, Api} from "@merchant-workspace/api-interfaces";
import accountRepository from "../account-repository";
import {Request, Response} from "express";
import * as jwt from 'jsonwebtoken'

export const handler = async (
  req: Request,
  res: Response<Api['api/v1/account/authentication']['response']>,
): Promise<void> => {
  const { email, password } = req.body;
  // https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
  const account = await accountRepository.getAccountByAuthData({email, password})

  console.log('********')
  console.log(account)

  const token = jwt.sign(
    { userId: account.id, email: account.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  res.status(201).send({ ...account, token })
}
