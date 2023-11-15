import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  categoryAddForm:FormGroup;
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Admin")
    this.createCategoryAddForm();

  }
  constructor(
    private authService:AuthService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,    
    private categoryService:CategoryService,
  ){}

  createCategoryAddForm(){
    this.categoryAddForm=this.formBuilder.group({
      categoryName:['',Validators.required],
    });
  }
  add(){
    if(this.categoryAddForm.valid)
    {
      console.log("ok");
      let categoryModel=Object.assign({},this.categoryAddForm.value);
      this.categoryService.add(categoryModel).subscribe(response=>{
        this.toastrService.success(response.message,"başarılı");
       setTimeout(()=>{                          
        this.router.navigate(['admin/categoryList'])
    }, 2000);  
      },responseError=>{
        this.toastrService.error(responseError.error,"başarısız");
      })
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
     
  }
}
