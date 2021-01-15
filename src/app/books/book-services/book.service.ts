import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../book";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books";
  constructor(private httpClient: HttpClient) { }

  getBooks(categoryId: number): Observable<Book[]>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${categoryId}`
    return this.getBooksList(searchUrl);
  }

  searchBook(keyword: string): Observable<Book[]>{
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}`;
    return this.getBooksList(searchUrl);
  }

  private getBooksList(url: string): Observable<Book[]>{
    return this.httpClient.get<GetResponseBook>(url).pipe(
      map(response => response._embedded.books)
    );
  }



}

interface GetResponseBook{
  _embedded: {
    books : Book[];
  }
}
