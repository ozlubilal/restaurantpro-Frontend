import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = 'https://localhost:44377/api/';

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Category>> {
    let newPath = this.apiUrl + "categories/getall"
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<Category>>{
    let newPath=this.apiUrl+"categories/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Category>>(newPath);
  }
  add(category:Category):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"categories/add",category)
  }
  update(category:Category):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"categories/update",category)
  }
  delete(category:Category):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"categories/delete",category)
  }

}
