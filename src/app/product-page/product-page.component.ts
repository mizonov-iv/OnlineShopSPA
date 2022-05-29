import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$!: Observable<any>;
  constructor(
    private productServ: ProductService,
    private router: ActivatedRoute 
  ) { }

  ngOnInit() {
    this.product$ = this.router.params
    .pipe(
      switchMap(params => {
        return this.productServ.getById(params['id'])
      })
    )
  }
  
  addProduct (product: any) {
    this.productServ.addProduct(product)
  }

}
