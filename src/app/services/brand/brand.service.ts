import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Brand } from 'src/app/models/brand/brand';
import { ResponseModel } from 'src/app/models/responseModel';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = environment.apiUrl +'brands/getall';
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl);
  }

  addToBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+ 'brands/add',brand);
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+ 'brands/update',brand);
  }

  getById(id: number):Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(environment.apiUrl+'brands/getbyid?id=' + id);
  }

}
