import { Component, OnInit } from '@angular/core';
import {Book} from "../book";
import {BookService} from "../book-services/book.service";

@Component({
  selector: 'app-books-grid',
  templateUrl: './books-grid.component.html',
  styleUrls: ['./books-grid.component.scss']
})
export class BooksGridComponent implements OnInit {

  books?: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.listBooks()
  }

  listBooks() {
    this.bookService.getBooks().subscribe(result=> this.books = result,
      error => console.log(error))
  }

}
