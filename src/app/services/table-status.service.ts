import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Category } from '../models/category';
import { TableStatus } from '../models/tableStatus';

@Injectable({
  providedIn: 'root'
})
export class TableStatusService {
  apiUrl = 'https://localhost:44377/api/';

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<TableStatus>> {
    let newPath = this.apiUrl + "tableStatuses/getall"
    return this.httpClient.get<ListResponseModel<TableStatus>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<TableStatus>>{
    let newPath=this.apiUrl+"tableStatuses/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<TableStatus>>(newPath);
  }
  add(tableStatus:TableStatus):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"tableStatuses/add",tableStatus)
  }
  update(tableStatus:TableStatus):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"tableStatuses/update",tableStatus)
  }
  delete(tableStatus:TableStatus):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"tableStatuses/delete",tableStatus)
  }
}
