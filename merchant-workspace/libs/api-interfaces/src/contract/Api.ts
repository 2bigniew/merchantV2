import {Account, AuthPayload} from './Account';
import { Company } from './Company';
import { Customer } from './Customer';
import { Invoice, PublicInvoice } from './Invoice';
import { InvoicePosition } from './InvoicePosition';

export interface Api {
  'api/v1/account/:id': {
    params: [number];
    response: Account;
  };
  'api/v1/account/list': {
    response: Account[];
    queryParams: {
      page?: number;
      limit?: number;
    };
  };
  'api/v1/account/authentication': {
    response: Account & { token: string };
    body: AuthPayload;
  }
  'api/v1/company/:id': {
    params: [number];
    response: Company;
  };
  'api/v1/company/list': {
    response: Company[];
  };
  'api/v1/customer/:id': {
    params: [number];
    response: Customer;
  };
  'api/v1/customer/list': {
    response: Customer[];
  };
  'api/v1/invoice/:id': {
    params: [number];
    response: Invoice;
  };
  'api/v1/invoice/public/:id': {
    params: [number];
    response: PublicInvoice;
  };
  'api/v1/invoice/list': {
    response: Invoice[];
  };
  'api/v1/invoice/invoice-position/:id': {
    params: [number];
    response: InvoicePosition;
  };
}
