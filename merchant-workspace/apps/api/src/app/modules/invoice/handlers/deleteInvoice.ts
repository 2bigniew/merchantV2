import { Changed, Invoice } from "@merchant-workspace/api-interfaces";
import invoiceRepository from "../invoice-repository";

export const handler = async (payload: { id: number }): Promise<Changed<Invoice>> => {
  const before = await invoiceRepository.getInvoiceById(payload.id);
  if (!before) {
    throw new Error("Invoice to delete not found");
  }
  await invoiceRepository.deleteInvoice(payload.id);
  return { before };
};
