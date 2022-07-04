import {Changed, InvoicePosition} from "@merchant-workspace/api-interfaces";
import invoicePositionRepository from "../invoice-position-repository";

export const handler = async (payload: { id: number }): Promise<Changed<InvoicePosition>> => {
  const before = await invoicePositionRepository.getInvoiceSinglePositionById(payload.id)
  if (!before) {
    throw new Error('Invoice position to delete not found')
  }
  await invoicePositionRepository.deleteInvoicePostition(payload.id)
  return { before }
}
