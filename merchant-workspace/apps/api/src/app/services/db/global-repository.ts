import accountRepository from "../../modules/account/account-repository";
import companyRepository from "../../modules/company/company-repository";
import customerRepository from "../../modules/customer/customer-repository";
import invoiceRepository from "../../modules/invoice/invoice-repository";
import invoicePositionRepository from "../../modules/invoice/invoice-position-repository";

export const repository = {
  account: accountRepository,
  company: companyRepository,
  customer: customerRepository,
  invoice: invoiceRepository,
  invoicePosition: invoicePositionRepository,
}
