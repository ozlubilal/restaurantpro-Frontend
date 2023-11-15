import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  ngOnInit(): void {
    this.createProductAddForm()
  }
  productAddForm:FormGroup;
  categories:Category[];
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,    
    private productService:ProductService,
    private categoryService:CategoryService,
    private toastrService:ToastrService,
    private authService:AuthService,
  ){}
  createProductAddForm(){
    this.authService.isRoleAuthenticated("Admin")
    this.productAddForm=this.formBuilder.group({
      productName:['',Validators.required],
      categoryName:['',Validators.required],
      price:['',Validators.required],
      unitsInStock:['',Validators.required],
    });
    this.getAllCategory();
  }
  getAllCategory(){
    this.categoryService.getAll().subscribe(response=>{
      this.categories=response.data
    })
  }
  add(){
    if(this.productAddForm.valid)
    {
      let productModel:Product=Object.assign({},this.productAddForm.value);
      productModel.categoryId=Number(this.categories.find(c=>c.categoryName==this.productAddForm.get('categoryName')?.value)?.id);
    console.log(productModel)

      this.productService.add(productModel).subscribe(response=>{
        this.toastrService.success(response.message,"başarılı");
       setTimeout(()=>{                          
        this.router.navigate(['admin/productList'])
    }, 2000);  
      },responseError=>{
        this.toastrService.error(responseError.error,"Başarısız");
      })
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
     
  }
}
