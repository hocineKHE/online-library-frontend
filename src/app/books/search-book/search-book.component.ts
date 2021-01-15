import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.scss']
})
export class SearchBookComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  searchBook(keyword: String){
    console.log(keyword)
    this.router.navigateByUrl('/search/'+keyword);
  }


}
