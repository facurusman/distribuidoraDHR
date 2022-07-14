import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { ProductData } from 'src/app/models/ProductData';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(private readonly http: HttpClient) {}
  getSales() {
    return this.http.get(`${environment.apiSales}/`);
  }
  getSalesByClient(id: number) {
    return this.http.get(`${environment.apiSales}/${id}`);
  }
  postSale(sale: Sale, productos: ProductData[]) {
    
    console.log(sale);
    return this.http.post(`${environment.apiSales}/crear`, { sale, productos });
  }
  filterSale(fecha_inicial: Date, fecha_final: Date) {
    return this.http.post(`${environment.apiSales}/`, { fecha_inicial, fecha_final });
  }
  getPropertiesClient(idCliente: any, idVenta: any) {
    return this.http.post(`${environment.apiSales}/propiedades`, { idCliente, idVenta });
  }
}
