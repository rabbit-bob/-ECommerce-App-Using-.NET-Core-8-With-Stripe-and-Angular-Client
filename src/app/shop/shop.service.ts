import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/IPagination';
import { ICategory } from '../shared/Models/ICategory';
import { map } from 'rxjs';
import { ShopParams } from '../shared/Models/ShopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseURl = "https://localhost:7056/api/";

  constructor(private http: HttpClient) { }

  getProduct(shopParams: ShopParams) {
    let params = new HttpParams();
    if(shopParams.categoryId) {
      params = params.append('categoryId', shopParams.categoryId.toString());
    }
    if(shopParams.sort) {
      params = params.append('sort', shopParams.sort);
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
