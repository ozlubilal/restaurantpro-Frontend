import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Floor } from '../models/floor';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  apiUrl = 'https://localhost:44377/api/';

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Floor>> {
    let newPath = this.apiUrl + "floors/getall"
    return this.httpClient.get<ListResponseModel<Floor>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<Floor>>{
    let newPath=this.apiUrl+"floors/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Floor>>(newPath);
  }
  add(floor:Floor):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"floors/add",floor)
  }
  update(floor:Floor):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"floors/update",floor)
  }
  delete(floor:Floor):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"floors/delete",floor)
  }
}
