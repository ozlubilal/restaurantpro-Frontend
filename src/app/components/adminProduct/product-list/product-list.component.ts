import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductDetails } from 'src/app/models/productDetails';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Admin")
    this.getAllProductDetails();
  }
  productDetails:ProductDetails[];
  constructor(
    private productService:ProductService,
    private toastrService:ToastrService,
    private authService:AuthService,
  ){}
  getAllProductDetails(){
    this.productService.GetListProductDetailDto().subscribe(response=>{
      this.productDetails=response.data;
    })
  }
  delete(id:number){
    let product:Product;
    this.productService.getById(id).subscribe(response=>{
      product=response.data;
      this.productService.delete(product).subscribe(response=>{
        this.toastrService.success(response.message,"başarılı");      
      this.getAllProductDetails();
      }, responseError=>{
        this.toastrService.error(responseError.error,"Başarısız");
      });   
    })
  }


}
