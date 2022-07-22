import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { ProductData } from 'src/app/models/ProductData';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
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
    var datePipe = new DatePipe("en-US");
    var fecha_inicial_pipe = datePipe.transform(fecha_inicial, 'yyyy/MM/dd');
    var fecha_final_pipe = datePipe.transform(fecha_final, 'yyyy/MM/dd');
    return this.http.post(`${environment.apiSales}/`, { fecha_inicial_pipe, fecha_final_pipe });
  }
  getPropertiesClient(idCliente: any, idVenta: any) {
    return this.http.post(`${environment.apiSales}/propiedades`, { idCliente, idVenta });
  }
}
