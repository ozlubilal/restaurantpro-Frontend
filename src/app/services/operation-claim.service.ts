import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {
  apiUrl = 'https://localhost:44377/api/';

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + "operationClaims/getalloperationclaim"
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }
  add(operationClaim:OperationClaim):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"operationClaims/add",operationClaim)
  }
  update(operationClaim:OperationClaim):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"operationClaims/update",operationClaim)
  }
  delete(operationClaim:OperationClaim):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"operationClaims/delete",operationClaim)
  }
}
