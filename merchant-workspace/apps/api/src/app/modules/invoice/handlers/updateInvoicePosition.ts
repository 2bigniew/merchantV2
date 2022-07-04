import {Changed, InvoicePosition, UpdateInvoicePositionPayload} from "@merchant-workspace/api-interfaces";
import invoicePositionRepository from "../invoice-position-repository";

export const handler = async (
  payload: UpdateInvoicePositionPayload,
): Promise<Changed<InvoicePosition>> => {
  const before = await invoicePositionRepository.getInvoiceSinglePositionById(payload.id)

  if (!before) {
    throw new Error('Invoice position to update not found')
  }

  const after = await invoicePositionRepository.updateInvoicePosition(payload)
  return { before, after }
}
