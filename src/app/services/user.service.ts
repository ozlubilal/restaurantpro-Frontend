import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Observable } from 'rxjs';
import { UserDetail } from '../models/userDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';
import { UserForUpdateDto } from '../models/userForUpdateDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:44377/api/';
  constructor(private httpClient:HttpClient) { }

  getAllUserDetails():Observable<ListResponseModel<UserDetail>>{
    let newPath=this.apiUrl+"users/getalluserdetail";
    return this.httpClient.get<ListResponseModel<UserDetail>>(newPath);
  
  }
  getUserById(id:number){
    let newPath=this.apiUrl+"users/getbyid?id="+id;
   return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  getUserDetailsByEmail(email:string):Observable<SingleResponseModel<UserDetail>>{
    let newPath = this.apiUrl + "users/getuserdetailbymail?email=" + email
    return this.httpClient.get<SingleResponseModel<UserDetail>>(newPath)
  }
  delete(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "users/delete";
    return this.httpClient.post<ResponseModel>(newPath,user)
   
  }
  update(userForUpdateDto:UserForUpdateDto):Observable<ResponseModel>{
    let newPath = this.apiUrl + "users/update";
    return this.httpClient.post<ResponseModel>(newPath,userForUpdateDto)
  }
  }

