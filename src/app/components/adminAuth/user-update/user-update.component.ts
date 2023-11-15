import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit{
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id=(params["id"]);
      this.getUserById(this.id);      
      })
    this.authService.isRoleAuthenticated("Admin")
    this.getAllClaim();
    this.createUpdateForm()
  
  }
  updateForm:FormGroup;
  operationClaims:OperationClaim[];
  id:number;
  user:User;
  constructor(
    private operationClaimService:OperationClaimService,
    private userService:UserService,
    private authService:AuthService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router:Router,
  ){}
  createUpdateForm(){
    this.updateForm=this.formBuilder.group({
      userId:[this.id,Validators.required],
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
  getUserById(id:number){
    this.userService.getUserById(id).subscribe(response=>{
      this.user=response.data;   
      console.log(response.data) 
    })
  }
 update(){
   let userUpdateModel=Object.assign({},this.updateForm.value);
   this.authService.update(userUpdateModel).subscribe(response => {
     this.toastrService.success(response.message, "Başarılı");
     this.createUpdateForm();
   }, responseError => {
     this.toastrService.error(responseError.error, "Başarısız");
   })
  console.log(userUpdateModel)
 }
}
