import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/Pagination';
import { ICategory } from '../shared/Models/Category';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseURl = "https://localhost:7056/api/";

  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http.get<IPagination>(this.baseURl + 'Products/get-all-products');
  }

  getCategory() {
    return this.http.get<ICategory[]>(this.baseURl + 'Categories/get-all-categories');
  }
}
