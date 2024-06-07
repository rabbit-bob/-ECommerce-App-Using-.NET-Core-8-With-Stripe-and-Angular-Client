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
  sortSelect: string = 'Name';
  sortOptions = [
    { name: 'Name', value: 'Name' },
    { name: 'Price: Min-Max', value: 'PriceAsc' },
    { name: 'Price: Max-Min', value: 'PriceDesc' }
  ]
  constructor(private shopService: ShopService) { }

    ngOnInit(): void {
      this.getProducts();
      this.getCategories();
    }

  getProducts() {
    this.shopService.getProduct(this.categoryIdSelected, this.sortSelect).subscribe(
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

  onCategorySelect(categoryId: number) {
    this.categoryIdSelected = categoryId;
    this.getProducts();
  }

  onSortSelect(sort: Event) {
    let sortValue = (sort.target as HTMLInputElement).value;
    this.sortSelect = sortValue;
    this.getProducts();
  }
}
