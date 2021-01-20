import {Component, OnInit} from '@angular/core';
import {Book} from "../model/book";
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
  }



}
