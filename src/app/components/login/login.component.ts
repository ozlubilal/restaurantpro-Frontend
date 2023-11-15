import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  userDetail:UserDetail;
  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private localService:LocalService,
    private router:Router,
    private toastrService:ToastrService,
  ){}
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],
    });
  }
 
  // getUserDetailsByMail(email:string){
  //   this.userService.getUserDetailsByEmail(email).subscribe(response=>{
  //   this.userDetail=response.data
  //   })
  // }
  login() {
    let loginModel: LoginModel = Object.assign({}, this.loginForm.value)
    this.authService.login(loginModel).subscribe((response) => {     
      this.localService.add("token", response.data.token)
      this.userService.getUserDetailsByEmail(this.loginForm.value.email).subscribe(response=>{
        this.userDetail=response.data;        
      this.localService.add("user_details", JSON.stringify(this.userDetail))
      if(this.userDetail.claimName=="User"){        
        this.router.navigate(['/waiter/index']);
      }
      else if(this.userDetail.claimName=="Admin"){
        this.router.navigate(['/admin/index']);
      }
      else if(this.userDetail.claimName=="Chef"){
        this.router.navigate(['/chef/index']);
      }
      else if(this.userDetail.claimName=="Cashier"){
        this.router.navigate(['/cashier/index']);
      }
      
      })
     
    },responseError=>{
      this.toastrService.error(responseError.error);
    })
  }
 
}
