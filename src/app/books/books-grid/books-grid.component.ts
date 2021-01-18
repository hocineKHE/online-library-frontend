import {Component, OnInit} from '@angular/core';
import {Book} from "../book";
import {BookService} from "../book-services/book.service";
import {ActivatedRoute} from "@angular/router";

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


  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listBooks()
    })
  }


  listBooks() {
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
      this.books = data._embedded.books;
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    };
  }
}
