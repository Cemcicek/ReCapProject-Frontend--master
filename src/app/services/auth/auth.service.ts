import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ItemResponseModel } from 'src/app/models/itemResponseModel';
import { LoginModel } from 'src/app/models/login/loginModel';
import { RegisterModel } from 'src/app/models/register/registerModel';
import { TokenModel } from 'src/app/models/token/tokenModel';
import { LocalStorageService } from '../LocalStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44372/api/auth/';
  //jwtHelper: JwtHelperService = new JwtHelperService();
  
  name: string = "";
  surname:string="";
  role:any;
  roles: any[] = [];
  token: any;
  isLoggedIn: boolean = false;
  userId: number;
  email:string;

  constructor(private httpClient:HttpClient,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private jwtService: JwtHelperService
   ) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<ItemResponseModel<TokenModel>>(this.apiUrl+"login", loginModel)
  }

  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }
    else{
      return false;
    }

  }

  register(registerModel:RegisterModel){
    return this.httpClient.post<ItemResponseModel<TokenModel>>(this.apiUrl+"register", registerModel)
  }

  logOut(){
    this.localStorageService.remove("token");
    this.localStorageService.remove("user");
    this.localStorageService.remove("email");
  }

  userDetailFromToken(){
    this.token = this.localStorageService.get("token");
    let decodedToken = this.jwtService.decodeToken(this.token);
    let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.name = name.split(' ')[0];
    let surname = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.surname = name.split(' ')[1];
    this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.userId =parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    this.email=decodedToken["email"];
  }

  roleCheck(roleList: string[]) {
    if (this.roles !== null) {
      roleList.forEach(role => {
        if (this.roles.includes(role)) {
          return true;
        } else {
          return false;
        }
      })
      return true;
      
    } else {
      return false;
    }
  }

  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }

}
