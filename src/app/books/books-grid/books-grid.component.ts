import { Component, OnInit } from '@angular/core';
import {Book} from "../book";
import {BookService} from "../book-services/book.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-books-grid',
  templateUrl: './books-grid.component.html',
  styleUrls: ['./books-grid.component.scss']
})
export class BooksGridComponent implements OnInit {

  books?: Book[];
  currentCategoryId: number = 0;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(()=>{
      this.listBooks()
    })
  }

  listBooks() {
    const hasCategoryId : boolean = this.activatedRoute.snapshot.paramMap.has('id');

    if(hasCategoryId){
      // @ts-ignore
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');
    }else {
      this.currentCategoryId = 1;
    }


    this.bookService.getBooks(this.currentCategoryId).subscribe(result=> this.books = result,
      error => console.log(error))
  }

}
