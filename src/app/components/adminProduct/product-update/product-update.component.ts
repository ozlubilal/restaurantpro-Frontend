import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Admin")
    this.activatedRoute.params.subscribe(params=>{
      this.id=(params["id"]);
      this.getProductById();
      })
  }
  productUpdateForm:FormGroup;
  product:Product;
  id:number;
  categories:Category[];
  constructor(
  private productService:ProductService,
  private categoryService:CategoryService,
  private formBuilder:FormBuilder,
  private activatedRoute:ActivatedRoute,
  private router:Router,
  private toastrService:ToastrService,
  private authService:AuthService,
  ){}
  createProductUpdateForm(){
    this.productUpdateForm=this.formBuilder.group({
      id:[this.product.id,Validators.required],
      productName:[this.product.productName,Validators.required],
      categoryName:["",Validators.required],
      price:[this.product.price,Validators.required],
      unitsInStock:[this.product.unitsInStock,Validators.required],
    })
  }
  getProductById(){
    this.productService.getById(this.id).subscribe(response=>{
         this.product=response.data;    
         console.log(this.product)    
         this.createProductUpdateForm();
         this.getAllCategory();
    })
  }
  getAllCategory(){
    this.categoryService.getAll().subscribe(response=>{
      this.categories=response.data
    })
  }
  update(){
    if(this.productUpdateForm.valid){
      let productModel:Product=Object.assign({},this.productUpdateForm.value);
      productModel.categoryId=Number(this.categories.find(c=>c.categoryName==this.productUpdateForm.get('categoryName')?.value)?.id);
      console.log(productModel)
      this.productService.update(productModel).subscribe(response=>{
        this.toastrService.success(response.message,"başarılı");},
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });   
        setTimeout(()=>{                          
          this.router.navigate(['admin/productList'])
      }, 2000);   
    }
    else{
      this.toastrService.error("formu eksiksiz giriniz","Başarısız");
    
  }
}
}
