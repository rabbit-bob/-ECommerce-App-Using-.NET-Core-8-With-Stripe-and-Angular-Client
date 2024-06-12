import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/IPagination';
import { ICategory } from '../shared/Models/ICategory';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseURl = "https://localhost:7056/api/";

  constructor(private http: HttpClient) { }

  getProduct(categoryId?: number, sort?: string) {
    let params = new HttpParams();
    if(categoryId) {
      params = params.append('categoryId', categoryId.toString());
    }
    if(sort) {
      params = params.append('sort', sort);
    }
    return this.http.get<IPagination>(this.baseURl + 'Products/get-all-products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        }))
  }

  getCategory() {
    return this.http.get<ICategory[]>(this.baseURl + 'Categories/get-all-categories');
  }
}
