import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../../model/book";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books";
  constructor(private httpClient: HttpClient) { }

  getBooks(categoryId: number, currentPage: number, pageSize: number, ): Observable<GetResponseBook>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${categoryId}&page=${currentPage}&size=${pageSize}`
    return this.httpClient.get<GetResponseBook>(searchUrl);
  }

  searchBook(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseBook>{
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBook>(searchUrl);
  }

  private getBooksList(url: string): Observable<Book[]>{
    return this.httpClient.get<GetResponseBook>(url).pipe(
      map(response => response._embedded.books)
    );
  }

  getBookById(id: number): Observable<Book>{
    const searchUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Book>(searchUrl);

  }



}

interface GetResponseBook{
  _embedded: {
    books : Book[];
  },page :{
    size:number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
