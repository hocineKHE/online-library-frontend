import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import {HttpClientModule} from "@angular/common/http";
import {BookService} from "./books/book-services/book.service";
import { BooksGridComponent } from './books/books-grid/books-grid.component';
import {RouterModule ,Routes} from "@angular/router";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes =[
  {path: "books", component: BooksComponent},
  {path: "category/:id", component: BooksComponent},
  {path: "",redirectTo: "/books", pathMatch: 'full'},
  {path: "**", component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BooksGridComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
