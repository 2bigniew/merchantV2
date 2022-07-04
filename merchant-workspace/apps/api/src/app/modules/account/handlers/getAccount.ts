import { Request, Response } from 'express'
import accountRepository from "../account-repository";

export const handler = async (req: Request, res: Response) => {
  // TODO JOI VALIDATION, PAGGINATION, LIMIT
  const { accountId } = req.params
  const account = await accountRepository.getAccountsById(accountId as unknown as number)

  res.status(200).json(account)
}
