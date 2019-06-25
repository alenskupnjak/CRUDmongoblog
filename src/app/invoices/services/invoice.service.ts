import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';
import { InvoicePaginationRsp } from '../models/invoice';

const BASE_URL = 'http://localhost:3000/api';
// const BASE_URL = 'http://localhost:5000/api';
// const BASE_URL = 'https://skup-crudmongo.herokuapp.com/api';


@Injectable({providedIn: 'root'})


export class InvoiceService {

  constructor(private httpClient: HttpClient) { }

  getInvoices({page, perPage, sortField, sortDir}): Observable<InvoicePaginationRsp> {
    let queryString = `${BASE_URL}/invoices?page=${page + 1}&perPage=${perPage}`;

    if (sortField && sortDir) {
      queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
    }

    return this.httpClient.get<InvoicePaginationRsp>(queryString);
  }

  editInvoice(id: string): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${BASE_URL}/invoices/${id}`);
  }

  createInvoice(body: Invoice): Observable<Invoice> {
   return this.httpClient.post<Invoice>(`${BASE_URL}/invoices`, body);
  }

  deleteInvoice(id: string): Observable<Invoice> {
   return this.httpClient.delete<Invoice>(`${BASE_URL}/invoices/${id}`);
  }

  updateInvoice(id: string, body: Invoice): Observable<Invoice> {
   return this.httpClient.put<Invoice>(`${BASE_URL}/invoices/${id}`, body);
  }

}
