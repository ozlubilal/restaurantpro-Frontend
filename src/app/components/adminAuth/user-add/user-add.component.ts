import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { RegisterModel } from 'src/app/models/resgisterModel';
import { AuthService } from 'src/app/services/auth.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Admin")
    this.getAllClaim();
    this.createRegisterForm()
  }
  registerForm:FormGroup;
  operationClaims:OperationClaim[];
  constructor(
    private operationClaimService:OperationClaimService,
    private authService:AuthService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
  ){}
  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      operationClaimId:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
    });
  }
  getAllClaim(){
    this.operationClaimService.getAll().subscribe(response=>{
      this.operationClaims=response.data;
      console.log(response.data)
    })

  }
 register(){
  let registerModel=Object.assign({},this.registerForm.value);
   this.authService.register(registerModel).subscribe(response => {
     this.toastrService.success(response.message, "Başarılı");
     this.createRegisterForm();
   }, responseError => {
     this.toastrService.error(responseError.error, "Başarısız");
   })
 }
}
