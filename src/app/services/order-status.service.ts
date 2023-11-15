import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { OrderStatus } from '../models/orderStatus';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  apiUrl = 'https://localhost:44377/api/';

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<OrderStatus>> {
    let newPath = this.apiUrl + "orderStatus/getall"
    return this.httpClient.get<ListResponseModel<OrderStatus>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<OrderStatus>>{
    let newPath=this.apiUrl+"orderStatus/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<OrderStatus>>(newPath);
  }
  add(orderStatus:OrderStatus):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"orderStatus/add",orderStatus)
  }
  update(orderStatus:OrderStatus):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"orderStatus/update",orderStatus)
  }
  delete(orderStatus:OrderStatus):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"orderStatus/delete",orderStatus)
  }
}
