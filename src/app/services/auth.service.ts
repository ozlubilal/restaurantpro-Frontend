import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/resgisterModel';
import { LocalService } from './local.service';
import { Router } from '@angular/router';
import { UserForUpdateDto } from '../models/userForUpdateDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44377/api/';
  constructor(private httpClient:HttpClient,private localService:LocalService,private router:Router,
   ) { }
  register(userForRegisterDto:RegisterModel){
    let newPath=this.apiUrl+"auth/register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,userForRegisterDto)
  }
  update(userForUpdateModel:UserForUpdateDto){
    let newPath=this.apiUrl+"auth/update"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,userForUpdateModel)
  }
  login(loginModel:LoginModel){
    let newPath=this.apiUrl+"auth/login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel)
  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
  isRoleAuthenticated(claimName:string){ 
    if (this.isAuthenticated()) {
      let userDetail = JSON.parse(this.localService.getItem('user_details') || '')
      if (userDetail.claimName == claimName) {
        return true;
      }
      return this.router.navigate([""]);
    }
    else {
      return this.router.navigate([""]);
    }
     
    
  }
  
}
