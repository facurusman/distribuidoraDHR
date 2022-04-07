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
    return this.http.get(`${environment.apiSales}/`);
  }

  postSale(sale: Sale) {
    console.log(sale);
    return this.http.post(`${environment.apiSales}/crear`, sale);
  }

  filterSale(fecha_inicial: Date, fecha_final: Date){
    return this.http.post(`${environment.apiSales}/`, {fecha_inicial, fecha_final});
  }
}
