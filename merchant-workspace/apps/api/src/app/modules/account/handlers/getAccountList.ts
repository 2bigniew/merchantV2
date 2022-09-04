import { Request, Response } from "express";
import accountRepository from "../account-repository";
import { Api } from "@merchant-workspace/api-interfaces";

export const handler = async (req: Request, res: Response<Api["api/v1/account/list"]["response"]>) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT

  const accounts = await accountRepository.getAccounts();

  res.status(200).json(accounts);
};
