import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SaleProductData } from '../models/SaleProductData';

@Injectable({
  providedIn: 'root',
})
export class PDFService {
  constructor(private readonly http: HttpClient) { }

  generarPDFProductos() {
    return this.http.post(`${environment.apiProducts}/crearPDF`, []);
  }
  generarPDFVentas() {
    return this.http.post(`${environment.apiSales}/crearPDF`, []);
  }
  generarPDFClientes() {
    return this.http.post(`${environment.apiClients}/crearPDF`, []);
  }
  generarPDFVentaClient(sales: SaleProductData[]) {
    return this.http.post(`${environment.apiSales}/crearPDF/exportarClientes`, {sales});
  }
  generarPDFVentaProduct(sales: SaleProductData[]) {
    console.log(sales);
    return this.http.post(`${environment.apiSales}/crearPDF/exportarProductos`, { sales });
  }
}
