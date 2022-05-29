import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FbResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  create(order: any) {
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
    .pipe(map<any, any>((response: FbResponse) => {
      return {
        ...order,
        id: response.name,
        data: new Date(order.date)
      }
    }))
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/orders.json`)
    .pipe(map<any, any>(res => {
      return Object.keys(res)
      .map( key => ({
        ...res[key],
        id: key,
        date: new Date(res[key].date)
      }))
    }))
  }

  remove (id: any) {
    return this.http.delete(`${environment.fbDbUrl}/orders/${id}.json`)
  }

}
