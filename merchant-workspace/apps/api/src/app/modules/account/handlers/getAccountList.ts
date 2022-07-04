import { Request, Response } from 'express'
import accountRepository from "../account-repository";

export const handler = async (req: Request, res: Response) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const accounts = await accountRepository.getAccounts()

  res.status(200).json(accounts)
}
