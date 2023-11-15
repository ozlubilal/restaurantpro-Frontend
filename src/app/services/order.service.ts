import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Order } from '../models/order';
import { OrderDetails } from '../models/orderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = 'https://localhost:44377/api/';

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Order>> {
    let newPath = this.apiUrl + "orders/getall"
    return this.httpClient.get<ListResponseModel<Order>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<Order>>{
    let newPath=this.apiUrl+"orders/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Order>>(newPath);
  }
  add(order:Order):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"orders/add",order)
  }
  update(order:Order):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"orders/update",order)
  }
  delete(order:Order):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"orders/delete",order)
  }
  refreshOrderDetails(list:OrderDetails[]):Observable<ListResponseModel<OrderDetails>>{
    let newPath=this.apiUrl+"orders/refreshorderdetailslist";
    return this.httpClient.post<ListResponseModel<OrderDetails>>(newPath,list);
  }

  GetOrderListByBillDate(billDate:string):Observable<ListResponseModel<OrderDetails>>{
    let newPath=this.apiUrl+"orders/getorderdetailsbybilldate?billdate="+billDate;
    return this.httpClient.get<ListResponseModel<OrderDetails>>(newPath);

  }
  

  //
  getByOrderStatusId(orderStatusId:number):Observable<ListResponseModel<Order>>{
    let newPath=this.apiUrl+"orders/getbyorderstatusid?orderStatusId="+orderStatusId
    return this.httpClient.get<ListResponseModel<Order>>(newPath);
  }
  getOrderDetails():Observable<ListResponseModel<OrderDetails>>{
    let newPath=this.apiUrl+"orders/getorderdetails";
    return this.httpClient.get<ListResponseModel<OrderDetails>>(newPath);
  }
  getOrderDetailsByStoreBillId(storeBillId:number):Observable<ListResponseModel<OrderDetails>>{
    let newPath=this.apiUrl+"orders/getorderdetailsbystorebillid?storeBillId="+storeBillId;
    return this.httpClient.get<ListResponseModel<OrderDetails>>(newPath);
  }
  
  getOrderDetailsOfActive():Observable<ListResponseModel<OrderDetails>>{
    let newPath=this.apiUrl+"orders/getorderdetailsofactive";
    return this.httpClient.get<ListResponseModel<OrderDetails>>(newPath);
  }
  getOrderDetailsByBillId(billId:number):Observable<ListResponseModel<OrderDetails>>{
    let newPath=this.apiUrl+"orders/getorderdetailsbybillid?billId="+billId
    return this.httpClient.get<ListResponseModel<OrderDetails>>(newPath);
  }

  getOrderDetailsById(id:number):Observable<OrderDetails>{
    let newPath=this.apiUrl+"orders/getorderdetailsbyid?id="+id
    return this.httpClient.get<OrderDetails >(newPath);
  }
 
  upQuantity(billId:number,productId:number):Observable<ListResponseModel<Order>>{
    let newPath=this.apiUrl+"orders/upquantity?billId="+billId+"&pid="+productId
    return this.httpClient.get<ListResponseModel<Order>>(newPath);
  }
  downQuantity(billId:number,productId:number):Observable<ListResponseModel<Order>>{
    let newPath=this.apiUrl+"orders/downquantity?billId="+billId+"&pid="+productId
    return this.httpClient.get<ListResponseModel<Order>>(newPath);
  }
}
