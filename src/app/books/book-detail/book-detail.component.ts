import { Component, OnInit } from '@angular/core';
import {Book} from "../book";
import {BookService} from "../book-services/book.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  book: Book = new Book();
  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute) { }

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
}
