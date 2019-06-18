export class Invoice {
  // tslint:disable-next-line:variable-name
  _id: string;
  item: string;
  qty: number;
  date: Date;
  due: Date;
  rate: number;
  tax: number;
}

export class InvoicePaginationRsp {
  docs: Invoice[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}
