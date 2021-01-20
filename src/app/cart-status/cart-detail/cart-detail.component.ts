import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../model/cart-item";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartDetails()
  }

  private cartDetails(){
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity = data,
      error => console.log(error)
    )

    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice = data,
      error => console.log(error)
    )

    this.cartService.calculateTotalPrice()

  }

  incrementQuantity(cartItemI: CartItem) {
    this.cartService.addToCart(cartItemI);
  }

  decrementQuantity(cartItemI: CartItem) {
    this.cartService.decrementQuantity(cartItemI);
  }

  removeBook(cartItemI: CartItem) {
    this.cartService.remove(cartItemI)
  }
}
