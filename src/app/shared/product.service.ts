import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FbResponse, Product } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type = 'Phone'
  cartProducts: Product[] = []

  constructor(private http: HttpClient) { }


  create(product: any) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
    .pipe(map<any, any>((response: FbResponse) => {
      return {
        ...product,
        id: response.name,
        data: new Date(product.date)
      }
    }))
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
    .pipe(map<any, any>(res => {
      return Object.keys(res)
      .map( key => ({
        ...res[key],
        id: key,
        date: new Date(res[key].date)
      }))
    }))
  }

  getById(id: any) {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
    .pipe(map<any, any>((res: Product) => {
      return {
        ...res,
        id,
        date: new Date(res.date)
      }
    }))
  }

  remove (id: any) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`)
  }

  update (product: Product) {
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product)
  }

  setType(type: any) {
    this.type = type 
  }

  addProduct(product: any) {
    this.cartProducts.push(product)
  }
}
