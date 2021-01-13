import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import {HttpClientModule} from "@angular/common/http";
import {BookService} from "./books/book-services/book.service";
import { BooksGridComponent } from './books/books-grid/books-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BooksGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
