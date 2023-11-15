import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SeaterOfTable } from '../models/seaterOfTable';

@Injectable({
  providedIn: 'root'
})
export class SeaterOfTableService {
  apiUrl = 'https://localhost:44377/api/';

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<SeaterOfTable>> {
    let newPath = this.apiUrl + "seateroftables/getall"
    return this.httpClient.get<ListResponseModel<SeaterOfTable>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<SeaterOfTable>>{
    let newPath=this.apiUrl+"seateroftables/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<SeaterOfTable>>(newPath);
  }
  add(seateroftable:SeaterOfTable):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"seateroftables/add",seateroftable)
  }
  update(seateroftable:SeaterOfTable):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"seateroftables/update",seateroftable)
  }
  delete(seateroftable:SeaterOfTable):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"seateroftables/delete",seateroftable)
  }
}
