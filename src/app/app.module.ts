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
import { CategoriesComponent } from './categories/categories.component';
import { SearchBookComponent } from './books/search-book/search-book.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import {JwPaginationModule} from "jw-angular-pagination";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './cart-status/cart-status.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CartDetailComponent } from './cart-status/cart-detail/cart-detail.component';

const routes: Routes =[
  {path: "books/:id", component: BookDetailComponent},
  {path: "books", component: BooksComponent},
  {path: "search/:keyword", component: BooksComponent},
  {path: "category/:id", component: BooksComponent},
  {path: "cart-detail", component: CartDetailComponent},
  {path: "",redirectTo: "/books", pathMatch: 'full'},
  {path: "**", component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BooksGridComponent,
    PageNotFoundComponent,
    CategoriesComponent,
    SearchBookComponent,
    BookDetailComponent,
    CartStatusComponent,
    CartDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwPaginationModule,
    NgbModule,
    NgxSpinnerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
