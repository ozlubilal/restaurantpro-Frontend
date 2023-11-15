import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  itemValue:string;
categories:Category[];
  constructor(
    private categoryService:CategoryService,
    private router:Router,
    private localService:LocalService,
    private authService:AuthService,
  ){}
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Admin")
    this.getAllCategory();
  }
  getAllCategory(){
    this.categoryService.getAll().subscribe(response=>{
    this.categories=response.data;
    })
  }
  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
  
  isAdminAuthenticated(){    
    let userDetail= JSON.parse(this.localService.getItem('user_details') || '')
   if(this.isAuthenticated()&&userDetail.claimName=="Admin"){
    return true;
   }
   else{
    return false;
   }
   
  }
 
    
  
  
 
}
