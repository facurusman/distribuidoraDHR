import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GraphicsService {
  constructor(private readonly http: HttpClient) {}

  getGraphics() {
    console.log("holaa estoy aca");
    
    return this.http.get(`${environment.apiGraphics}`);
  }
}
