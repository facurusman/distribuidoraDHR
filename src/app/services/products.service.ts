import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

export interface ProductClientData {
  descripcion: string;
  precio_base: string;
  precio: string;
  precio_mostrar: string;
  selected: boolean;
  id: number;
}


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly http: HttpClient) { }
  getProducts() {
    return this.http.get(`${environment.apiProducts}`);
  }

  getProductsByCliente(id: any) {
    return this.http.get(`${environment.apiProductsByCliente}/${id}`);
  }
  getProduct(id: any) {
    return this.http.get(`${environment.apiProducts}/${id}`);
  }
  editProduct(id: any, product: Product) {
    return this.http.put(`${environment.apiProducts}/${id}`, product)
  }

  postProduct(product: Product) {
    return this.http.post(`${environment.apiProducts}/crear`, product);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${environment.apiProducts}/${id}`)
  }

  editarProductoPorCliente(idCliente: string, productos: ProductClientData[]) {
    return this.http.post(`${environment.apiProducts}/editarPrecioPorCliente`, { idCliente, productos });
  }
  aumentarElPrecio(valor : number, productos: ProductClientData[]) {
    return this.http.put(`${environment.apiProducts}/aumentarPrecios`, {valor, productos });
  }
}
