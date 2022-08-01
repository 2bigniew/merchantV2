import initDB from './init'
import accountRepository from "../../modules/account/account-repository";
import companyRepository from "../../modules/company/company-repository";
import invoiceRepository from "../../modules/invoice/invoice-repository";

export const fixtures = async (): Promise<void> => {
  // TODO check is database empty

  if (process.env.NODE_ENV === 'development' && (await accountRepository.lastId()) < 1) {
    await initDB.initTestAccountData()
    const accountId = await accountRepository.lastId()
    await initDB.initTestCompanyData(accountId)
    await initDB.initTestCustomerData(accountId)
    const companyId = await companyRepository.lastId()
    await initDB.initTestInvoiceData(accountId, companyId)
    const invoiceId = await invoiceRepository.lastId()
    await initDB.initTestInvoicePositionData(invoiceId)
  }
}
