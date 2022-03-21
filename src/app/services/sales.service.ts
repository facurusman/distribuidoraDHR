import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private readonly http: HttpClient) { }
  getSales() {
    return this.http.get(`${environment.apiUrl}/productos`);
  }

  postSale(sale: Sale) {
    console.log(sale);
    return this.http.post(`${environment.apiUrl}/productos`, sale);
  }
}
