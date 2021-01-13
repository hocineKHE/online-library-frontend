import {Component, OnInit} from '@angular/core';
import {Book} from "./book";
import {BookService} from "./book-services/book.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {



  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.listBooks();
  }

  listBooks() {
    this.bookService.getBooks().subscribe(result=> this.books = result,
      error => console.log(error))
  }

}
