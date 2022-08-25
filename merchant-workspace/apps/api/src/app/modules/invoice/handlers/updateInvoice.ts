import { Changed, Invoice, UpdateInvoicePayload } from "@merchant-workspace/api-interfaces";
import invoiceRepository from "../invoice-repository";

export const handler = async (payload: UpdateInvoicePayload): Promise<Changed<Invoice>> => {
  const before = await invoiceRepository.getInvoiceById(payload.id);

  if (!before) {
    throw new Error("Invoice to update not found");
  }

  const after = await invoiceRepository.updateInvoice(payload);
  return { before, after };
};
