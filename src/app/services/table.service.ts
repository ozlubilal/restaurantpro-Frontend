import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Table } from '../models/table';
import { TableDetails } from '../models/tableDetails';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  apiUrl = 'https://localhost:44377/api/';

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Table>> {
    let newPath = this.apiUrl + "tables/getall"
    return this.httpClient.get<ListResponseModel<Table>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<Table>>{
    let newPath=this.apiUrl+"tables/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Table>>(newPath);
  }
  getByStatuId(statuId:number):Observable<ListResponseModel<Table>> {
    let newPath = this.apiUrl + "tables/getbystatuid?statuid="+statuId
    return this.httpClient.get<ListResponseModel<Table>>(newPath);
  }
  getTableOfActiveBill(){
    let newPath = this.apiUrl + "tables/gettableofactivebill"
    return this.httpClient.get<ListResponseModel<Table>>(newPath);
  }
  add(table:Table):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"tables/add",table)
  }
  update(table:Table):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"tables/update",table)
  }
  delete(table:Table):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"tables/delete",table)
  }

  GetListTableDetailDto():Observable<ListResponseModel<TableDetails>> {
    let newPath = this.apiUrl + "tables/getlisttabledetaildto"
    return this.httpClient.get<ListResponseModel<TableDetails>>(newPath);
  }


  
}
