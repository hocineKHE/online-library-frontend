import {Component, OnInit} from '@angular/core';
import {CategoryService} from "./category-service/category.service";
import {Category} from "./category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories?: Category[];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(result => this.categories = result,
      error => console.log(error))
  }

}
