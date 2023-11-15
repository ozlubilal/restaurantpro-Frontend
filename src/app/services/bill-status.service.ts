import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { BillStatus } from '../models/billStatus';

@Injectable({
  providedIn: 'root'
})
export class BillStatusService {
  apiUrl = 'https://localhost:44377/api/';

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<BillStatus>> {
    let newPath = this.apiUrl + "billStatuses/getall"
    return this.httpClient.get<ListResponseModel<BillStatus>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<BillStatus>>{
    let newPath=this.apiUrl+"billStatuses/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<BillStatus>>(newPath);
  }
  add(billStatus:BillStatus):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"billStatuses/add",billStatus)
  }
  update(billStatus:BillStatus):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"billStatuses/update",billStatus)
  }
  delete(billStatus:BillStatus):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"billStatuses/delete",billStatus)
  }
}
