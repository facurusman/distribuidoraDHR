import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PDFService {
  constructor(private readonly http: HttpClient) {}

  generarPDFProductos() {
      console.log("aca")
    return this.http.post(`${environment.apiProducts}/crearPDF`,[],{responseType: 'blob'});
  }
}
