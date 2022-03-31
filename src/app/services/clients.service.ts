import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private readonly http: HttpClient) {}

  getClients() {
    return this.http.get(`${environment.apiUrl}/clientes`);
  }

  getClient(id :number){
    const url = `${environment.apiUrl}/${id}`;
    return this.http.get(url);
  }

  postClient(client: Client) {
    console.log(client);
    return this.http.post(`${environment.apiUrl}/clientes`, client);
  }
  editClient(client : Client, id: number){
    //agarrar lo que viene de la base y editarlo.
    //console.log(client)
    return this.http.post(`${environment.apiUrl}/edit/${id}`, client)
  }
}
