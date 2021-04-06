import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from 'src/app/models/rental/rental';
import { ResponseModel } from 'src/app/models/responseModel';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  
  constructor(private httpClient:HttpClient) { }

  /*
  rentalCar(rental:Rental):Observable<ResponseModel>{
    let path = environment.apiUrl+"rentals/add";
      return this.httpClient.post<ResponseModel>(path,rental);
  }
  */
}
