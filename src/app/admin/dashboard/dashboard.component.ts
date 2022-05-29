import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  products: any[] = []
  pSub!: Subscription
  rSub!: Subscription
  http: any;

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit() {
    this.pSub = this.productServ.getAll().subscribe(products => {
      console.log(products)
      this.products = products
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }

  remove (id: any) {
    this.rSub = this.productServ.remove(id).subscribe( () => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }

}
