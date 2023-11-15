import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Admin")
    this.activatedRoute.params.subscribe(params=>{
      this.id=(params["id"]);
      this.getCategoryById();
      
      })
  }
  categoryUpdateForm:FormGroup;
  category:Category;
  id:number;
  constructor(
    private categoryService:CategoryService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService:ToastrService,
    private authService:AuthService,
  ){}

  createCategoryUpdateForm(){
    this.categoryUpdateForm=this.formBuilder.group({
      id:[this.category.id,Validators.required],
      categoryName:[this.category.categoryName,Validators.required],
    })
  }
  getCategoryById(){
    this.categoryService.getById(this.id).subscribe(response=>{
         this.category=response.data;
         this.createCategoryUpdateForm();
    })
  }
  update(){
    if(this.categoryUpdateForm.valid){
      let categoryModel=Object.assign({},this.categoryUpdateForm.value);
      console.log(categoryModel)
      this.categoryService.update(categoryModel).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")},
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });   
        setTimeout(()=>{                          
          this.router.navigate(['admin/categoryList'])
      }, 2000);   
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    
  }
}

}
