import { Injectable } from '@angular/core';
import {CartItem} from "../model/cart-item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem){
    let alreadyExistInCart: boolean = false;
    // @ts-ignore
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0){
      // @ts-ignore
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id)

      alreadyExistInCart = (existingCartItem != undefined)

    }

    if(alreadyExistInCart){
      // @ts-ignore
      existingCartItem.quantity = existingCartItem.quantity + 1;

    }else {
      this.cartItems.push(cartItem)
    }

    this.calculateTotalPrice()

  }

   calculateTotalPrice() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentItem of this.cartItems){
      // @ts-ignore
      totalPriceValue += currentItem.quantity * currentItem.unitPrice;
      // @ts-ignore
      totalQuantityValue += currentItem.quantity  ;
    }

    /**
     * publish the events
     */
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(cartItemI: CartItem) {
    // @ts-ignore
    cartItemI.quantity = cartItemI.quantity - 1;

    if(cartItemI.quantity === 0){
      this.remove(cartItemI)
    }else {
      this.calculateTotalPrice();
    }

  }


  remove(cartItem :CartItem){
   const itemIndex = this.cartItems.findIndex((tempCartItem)=> tempCartItem.id ===cartItem.id)

    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      this.calculateTotalPrice()
    }
  }
}
