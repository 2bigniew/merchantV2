import {Changed, CreateInvoicePositionPayload, InvoicePosition} from "@merchant-workspace/api-interfaces";
import invoicePositionRepository from "../invoice-position-repository";

export const handler = async (
  payload: CreateInvoicePositionPayload,
): Promise<Changed<InvoicePosition>> => {
  const id = await invoicePositionRepository.createInvoicePosition(payload)
  const after = await invoicePositionRepository.getInvoiceSinglePositionById(id)

  if (!after) {
    throw new Error('Created invoice position not found')
  }

  return { after }
}
