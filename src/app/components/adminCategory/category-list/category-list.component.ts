import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Admin")
    this.getAllCategory();
  }
  
 categories:Category[];
  constructor(
    private categoryService:CategoryService,
    private toastrService:ToastrService,
    private authService:AuthService,
  ){}

getAllCategory(){
  this.categoryService.getAll().subscribe(response=>{
    this.categories=response.data;
  })
}
delete(category:Category){
  this.categoryService.delete(category).subscribe(response=>{
    this.toastrService.success("silme başarılı")
    this.getAllCategory();
  },responseError=>{
    this.toastrService.error(responseError.error)
  })
}

}
