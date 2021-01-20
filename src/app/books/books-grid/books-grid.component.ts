import {Component, OnInit} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../book-services/book.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../cart-status/cart.service";
import {CartItem} from "../../model/cart-item";
import {NgxSpinner} from "ngx-spinner/lib/ngx-spinner.enum";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-books-grid',
  templateUrl: './books-grid.component.html',
  styleUrls: ['./books-grid.component.scss']
})
export class BooksGridComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  previousCategory: number = 1;

  //properties for server side pagination
  currentPage: number = 1;
  pageSize: number = 3;
  totalRecords: number = 0;


  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private ngxSpinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listBooks()
    })
  }


  listBooks() {
    /**
     * start the spinner
     */
    this.ngxSpinnerService.show();

    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword')

    if (this.searchMode) {

      this.handleSearchBook()
    } else {

      this.handleListBook()
    }

  }


  private handleListBook() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // @ts-ignore
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    /**
     * setting up the current page parameter
     * if user navigate to other category
     */

    if (this.previousCategory != this.currentCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategory = this.currentCategoryId;

    this.bookService.getBooks(
      this.currentCategoryId,
      this.currentPage - 1,
      this.pageSize).subscribe(this.processPaginate(),
      error => console.log(error))
  }

  private handleSearchBook() {

    // @ts-ignore
    const keyword: string = this.activatedRoute.snapshot.paramMap.get('keyword')
                      this.bookService.
                      searchBook(keyword, this.currentPage-1, this.pageSize).
                      subscribe(this.processPaginate(), error => console.log(error))


  }


  /*
 * page size part
 * */

  updatePageSize(pageSize: any) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }

  private processPaginate() {
    // @ts-ignore
    return data => {
      /**
       * stoop the spinner
       */
      this.ngxSpinnerService.hide()

      this.books = data._embedded.books;
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    };
  }

  /**
   * payment part
   * @param book
   */

  addToCart(book: Book) {
    const cartItem = new CartItem(book)
    this.cartService.addToCart(cartItem)
  }
}
