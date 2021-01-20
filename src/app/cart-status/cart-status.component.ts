import { Component, OnInit } from '@angular/core';
import {CartService} from "./cart.service";

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;



  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus()
  }

  private updateCartStatus() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data, error => console.log(error)
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data, error => console.log(error)
    )
  }
}
