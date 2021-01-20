import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../book-services/book.service";
import {ActivatedRoute} from "@angular/router";
import {CartItem} from "../../model/cart-item";
import {CartService} from "../../cart-status/cart.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  book: Book = new Book();
  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      ()=>
        this.getBookInfo()
    );
  }

  getBookInfo(){
    // @ts-ignore
    const id = +this.activatedRoute.snapshot.paramMap.get('id');

    this.bookService.getBookById(id).subscribe(result=> this.book = result, error => console.log(error))

  }

  /**
   * payment part
   * @param book
   */

  addToCart() {
    const cartItem = new CartItem(this.book)
    this.cartService.addToCart(cartItem)
  }
}
