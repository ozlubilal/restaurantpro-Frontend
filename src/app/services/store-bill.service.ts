import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { StoreBill } from '../models/storeBill';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { StoreBillDetails } from '../models/storeBillDetails';

@Injectable({
  providedIn: 'root'
})
export class StoreBillService {
  apiUrl = 'https://localhost:44377/api/';
  constructor(private httpClient:HttpClient) { }

  add(storeBill:StoreBill):Observable<ResponseModel>{
    let newPath = this.apiUrl + "storebills/add"
    return this.httpClient.post<ResponseModel>(newPath,storeBill);
  }
  delete(storeBill:StoreBill):Observable<ResponseModel>{
    let newPath = this.apiUrl + "storebills/delete"
    return this.httpClient.post<ResponseModel>(newPath,storeBill);
  }
  update(storeBill:StoreBill):Observable<ResponseModel>{
    let newPath = this.apiUrl + "storebills/update"
    return this.httpClient.post<ResponseModel>(newPath,storeBill);
  }
  getAll():Observable<ListResponseModel<StoreBill>>{
    let newPath=this.apiUrl+"storebills/getall";
    return this.httpClient.get<ListResponseModel<StoreBill>>(newPath);
  }
  getByStatusId(statusId:number):Observable<SingleResponseModel<StoreBill>>{
    let newPath=this.apiUrl+"storebills/getbystorebillstatusid?statusId="+statusId;
    return this.httpClient.get<SingleResponseModel<StoreBill>>(newPath);
  }
  getStoreBillDetails(){
    let newPath=this.apiUrl+"storebills/getlistdetails";
    return this.httpClient.get<ListResponseModel<StoreBillDetails>>(newPath);
  }
  


}
