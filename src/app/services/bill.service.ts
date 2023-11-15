import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill } from '../models/bill';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { BillDetails } from '../models/billDetails';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  apiUrl = 'https://localhost:44377/api/';

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Bill>> {
    let newPath = this.apiUrl + "bills/getall"
    return this.httpClient.get<ListResponseModel<Bill>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<Bill>>{
    let newPath=this.apiUrl+"bills/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Bill>>(newPath);
  }
  add(Bill:Bill):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"bills/add",Bill)
  }
  update(Bill:Bill):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"bills/update",Bill)
  }
  delete(Bill:Bill):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"bills/delete",Bill)
  }
  calculateOfBill(billId:number):Observable<SingleResponseModel<number>>{
    let newPath=this.apiUrl+"bills/calculatebillprice?billid="+billId
    return this.httpClient.get<SingleResponseModel<number>>(newPath);
  }
//
  getListBillDetailDto():Observable<ListResponseModel<Bill>> {
    let newPath = this.apiUrl + "bills/getlistbilldetaildto"
    return this.httpClient.get<ListResponseModel<Bill>>(newPath);
  }
  //
  getByBillStatusId(billStatusId:number):Observable<ListResponseModel<Bill>> {
    let newPath = this.apiUrl + "bills/getbybillstatusid?billStatusId="+billStatusId;
    return this.httpClient.get<ListResponseModel<Bill>>(newPath);
  }
  getByStoreBillId(storeBillId:number):Observable<ListResponseModel<Bill>> {
    let newPath = this.apiUrl + "bills/getbystorebillid?storebillId="+storeBillId;
    return this.httpClient.get<ListResponseModel<Bill>>(newPath);
  }
  getBillDetailsByStoreBillId(storeBillId:number):Observable<ListResponseModel<BillDetails>> {
    let newPath = this.apiUrl + "bills/getbilldetailsbystorebillid?storebillId="+storeBillId;
    return this.httpClient.get<ListResponseModel<BillDetails>>(newPath);
  }
  //
  getByDate(date:Date):Observable<ListResponseModel<Bill>> {
    let newPath = this.apiUrl + "bills/getbydate?date="+date;
    return this.httpClient.get<ListResponseModel<Bill>>(newPath);
  }
  getByTableIdAndStatusId(tableId:number,statusId:number):Observable<SingleResponseModel<Bill>>{
    let newPath=this.apiUrl+"bills/getbytableidandstatusid?tableId="+tableId+"&&statusId="+statusId;
    return this.httpClient.get<SingleResponseModel<Bill>>(newPath);
  }
}
