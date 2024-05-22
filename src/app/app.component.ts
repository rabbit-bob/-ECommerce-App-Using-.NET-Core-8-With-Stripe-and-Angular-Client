import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './shared/Models/Product';
import { IPagination } from './shared/Models/Pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'client';
  baseURl = "https://localhost:7056/api/Products/get-all-products";
  products:IProduct[];
  constructor(private http:HttpClient) {

  }
  getProduct() {
    return this.http.get(this.baseURl).subscribe(
      (values:IPagination) => {
        this.products = values.data;
        console.log(values);
      }
    );
  }
  ngOnInit(): void {
    this.getProduct();
  }

}
