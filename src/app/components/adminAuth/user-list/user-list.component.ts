import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  userDetails:UserDetail[];
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Admin")
    this.getAllUserDetails();
  }
  constructor(
    private authService:AuthService,
    private userService:UserService,
    private toastrService:ToastrService,
    private router:Router,
  ){}
getAllUserDetails(){
  this.userService.getAllUserDetails().subscribe(response=>{
    this.userDetails=response.data;
  })
}
delete(userId:number){
  this.userService.getUserById(userId).subscribe(response=>{
 this.userService.delete(response.data).subscribe(response=>{
    this.toastrService.success(response.message);
    this.getAllUserDetails();
  })

  })
 
  
}

}
