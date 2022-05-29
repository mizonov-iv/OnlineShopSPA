import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../shared/interfaces';
import { OrderService } from '../shared/order.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts: Product[] = []
  totalPrice = 0

  form!: FormGroup
  submitted = false
  added = ''

  constructor(
    private productServ: ProductService,
    private orderServ: OrderService
  ) { }

  ngOnInit() {
    this.cartProducts = this.productServ.cartProducts
    for (let index = 0; index < this.cartProducts.length; index++) {
      this.totalPrice += +this.cartProducts[index].price!
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    this.submitted = true

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date()      
    }

    this.orderServ.create(order).subscribe( response => {
      this.form.reset()
      this.submitted = false
      this.added = 'Доставка оформлена.'
    })
  }

  delete(product: any) {
    this.totalPrice -= +product.price
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1)

  }

}
