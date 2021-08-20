import { Component, OnInit } from "@angular/core";

import { IProduct } from './product';
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = "Product List";
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;

    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter: ', value);
        this.filteredProducts = this.performFilter(this._listFilter);
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [] ;

    constructor(private productService: ProductService) {            
    }

    toggleImage() {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log('In OnInit');
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().includes(filterBy)
        );
    }

    ratingClicked(message: string): void {
        this.pageTitle = `Product List: ${message}`;
    }
}