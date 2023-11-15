import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/models/userDetail';
import { LocalService } from 'src/app/services/local.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{
  userDetail:UserDetail;
  claimName:string;
  navigatePage:string;
constructor(
  private localService:LocalService,
  private router:Router,
  private authService:AuthService,

){}
  ngOnInit(): void {
   if(this.isAuthenticated()){
    this.getUserDetail();
   }
  }
  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
  getUserDetail(){
    this.userDetail= JSON.parse(this.localService.getItem('user_details') || '')
    this.claimName=this.userDetail.claimName;
  }
  logOut(){
    this.localService.delete("token");
    this.localService.delete("user_details");
    this.router.navigate(["/"]).then(()=>{
      window.location.reload()});  
    }


}




