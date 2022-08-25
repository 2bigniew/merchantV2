import { Account, AuthPayload } from "./Account";
import { Company } from "./Company";
import { Customer } from "./Customer";
import { Invoice, PublicInvoice } from "./Invoice";
import { InvoicePosition } from "./InvoicePosition";

export interface Api {
  "api/v1/account/:id": {
    method: "GET";
    params: [number];
    response: Account;
  };
  "api/v1/account/list": {
    method: "GET";
    response: Account[];
    queryParams: {
      page?: number;
      limit?: number;
    };
  };
  "api/v1/account/authentication": {
    method: "POST";
    response: Account & { token: string };
    body: AuthPayload;
  };
  "api/v1/company/:id": {
    method: "GET";
    params: [number];
    response: Company;
  };
  "api/v1/company/list": {
    method: "GET";
    response: Company[];
  };
  "api/v1/customer/:id": {
    method: "GET";
    params: [number];
    response: Customer;
  };
  "api/v1/customer/list": {
    method: "GET";
    response: Customer[];
  };
  "api/v1/invoice/:id": {
    method: "GET";
    params: [number];
    response: Invoice;
  };
  "api/v1/invoice/public/:id": {
    method: "GET";
    params: [number];
    response: PublicInvoice;
  };
  "api/v1/invoice/list": {
    method: "GET";
    response: Invoice[];
  };
  "api/v1/invoice/invoice-position/:id": {
    method: "GET";
    params: [number];
    response: InvoicePosition;
  };
}
