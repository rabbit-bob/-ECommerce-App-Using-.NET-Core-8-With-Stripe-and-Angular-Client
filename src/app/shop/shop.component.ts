import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/Models/Product';
import { ShopService } from './shop.service';
import { ICategory } from '../shared/Models/Category';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  category: ICategory[];

  categoryIdSelected: number = 0;
  constructor(private shopService: ShopService) { }

    ngOnInit(): void {
      this.getProducts();
      this.getCategories();
    }

  getProducts() {
    this.shopService.getProduct(this.categoryIdSelected).subscribe(
      response => {
        this.products = response.data;
      }
    )
  }

  getCategories() {
    this.shopService.getCategory().subscribe(
      response => {
        this.category = [{id: 0, name: 'All', description: ''}, ...response];
      }
    )
  }

  OnCategorySelect(categoryId: number) {
    this.categoryIdSelected = categoryId;
    this.getProducts();
  }
}
