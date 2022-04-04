import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly http: HttpClient) {}
  getProducts() {
    return this.http.get(`${environment.apiProducts}`);
  }

  postProduct(product: Product) {
    console.log(product);
    return this.http.post(`${environment.apiProducts}/crear`, product);
  }
}
