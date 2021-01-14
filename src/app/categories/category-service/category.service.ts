import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../../books/book";
import {Category} from "../category";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryUrl = "http://localhost:8080/api/v1/categories";

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.categories)
    );

  }
}

interface GetResponseCategory{
  _embedded: {
    categories : Category[];
  }
}
