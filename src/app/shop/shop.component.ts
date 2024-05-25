import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/Models/Product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  constructor(private shopService: ShopService) { }
  
    ngOnInit(): void {
      this.getProducts();
    }

  getProducts() {
    this.shopService.getProduct().subscribe(
      response => {
        this.products = response.data;
      }
    )
  }
}
