import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private readonly http: HttpClient) { }


  getClients(){
    return this.http.get(`${environment.apiUrl}/clientes`);
  }

  postClient(client:Client){
    console.log(client)
    return this.http.post(`${environment.apiUrl}/clientes`, client)
  }
}
