import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { IProduct } from '../shared/Models/IProduct';
import { ShopService } from './shop.service';
import { ICategory } from '../shared/Models/ICategory';
import { ShopParams } from '../shared/Models/ShopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  @ViewChild('search') searchTerm: ElementRef;
  products: IProduct[];
  category: ICategory[];
  shopParams = new ShopParams();
  totalCount: number;
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
    this.shopService.getProduct(this.shopParams).subscribe(
      response => {
        this.products = response.data;
        this.totalCount = response.count;
        this.shopParams.pageNumber = response.pageNumber;
        this.shopParams.pageSize = response.pageSize;
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
    this.shopParams.categoryId = categoryId;
    this.getProducts();
  }

  onSortSelect(sort: Event) {
    let sortValue = (sort.target as HTMLInputElement).value;
    this.shopParams.sort = sortValue;
    this.getProducts();
  }

  onPageChanged(event: any) {
    this.shopParams.pageNumber = event;
    this.getProducts();
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
