import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sale } from '../models/sale';
import { ProductData } from 'src/app/models/ProductData';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private readonly http: HttpClient) { }
  getSales() {
    return this.http.get(`${environment.apiSales}/`);
  }
  getSalesByClient(id: number) {
    return this.http.get(`${environment.apiSales}/${id}`)
  }
  postSale(sale: Sale, productos : ProductData[]) {
    return this.http.post(`${environment.apiSales}/crear`, {sale,productos});
  }
  filterSale(fecha_inicial: Date, fecha_final: Date) {
    return this.http.post(`${environment.apiSales}/`, { fecha_inicial, fecha_final });
  }
}
