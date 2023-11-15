import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.css']
})
export class TryComponent implements OnInit {
  ngOnInit(): void {
    this.getAllCategory();
    
  }
  categories:Category[];
  products:Product[];
  constructor(
    private productService:ProductService,
    private categoryService:CategoryService,
  ){}

  getAllCategory(){
    this.categoryService.getAll().subscribe(response=>{
     this.categories=response.data;     
    })
  }
  getProductsByCategoryId(categoryId:number){
    this.productService.GetByCategoryId(categoryId).subscribe(response=>{
      this.products=response.data;
    })
  }
 

}

