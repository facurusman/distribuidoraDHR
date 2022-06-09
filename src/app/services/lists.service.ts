import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  constructor(private readonly http: HttpClient) {}

  getLists() {
    return this.http.get(`${environment.apiLists}`);
  }

  getList(id: number) {
    return this.http.get(`${environment.apiLists}/${id}`);
  }

  postList(list: List) {
    return this.http.post(`${environment.apiLists}/crear`, list);
  }

  editList(list: List, id: number) {
    return this.http.put(`${environment.apiLists}/${id}`, list);
  }

  deleteList(id: number) {
    return this.http.delete(`${environment.apiLists}/${id}`);
  }
}
