import {Changed, CreateInvoicePayload, Invoice} from "@merchant-workspace/api-interfaces";
import invoiceRepository from "../invoice-repository";

export const handler = async (payload: CreateInvoicePayload): Promise<Changed<Invoice>> => {
  const invoiceId = await invoiceRepository.createInvoice(payload)
  const after = await invoiceRepository.getInvoiceById(invoiceId)

  if (!after) {
    throw new Error('Created invoice not found')
  }

  return { after }
}
