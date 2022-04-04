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
    return this.http.get(`${environment.apiClients}`);
  }

  getClient(id :number){
    const url = `${environment.apiClients}/${id}`;
    return this.http.get(url);
  }

  postClient(client: Client) {
    console.log(client);
    return this.http.post(`${environment.apiClients}/crear`, client);
  }
  editClient(client : Client, id: number){
    //agarrar lo que viene de la base y editarlo.
    //console.log(client)
    return this.http.put(`${environment.apiClients}/${id}`, client)
  }
}
