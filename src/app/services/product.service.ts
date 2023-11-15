import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Product } from '../models/product';
import { ProductDetails } from '../models/productDetails';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'https://localhost:44377/api/';

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getall"
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  getById(id:number):Observable<SingleResponseModel<Product>>{
    let newPath=this.apiUrl+"products/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Product>>(newPath);
  }
  add(product:Product):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl+"products/add",product)
  }
  update(product:Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/update",product)
  }
  delete(product:Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/delete",product)
  }
  GetByCategoryId(categoryId:number):Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getbycategoryid?categoryId="+categoryId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  //
  GetByUnitsInStock(unitsInstock:number):Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getbyunitsinstock?unitsInStock="+unitsInstock;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  GetListProductDetailDto():Observable<ListResponseModel<ProductDetails>> {
    let newPath = this.apiUrl + "products/getlistproductdetaildto"
    return this.httpClient.get<ListResponseModel<ProductDetails>>(newPath);
  }
  
}
