import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  //localStorage: Storage;
  constructor() {
    //this.localStorage = window.localStorage;
  }
 

  get(key:string){
    return localStorage.getItem(key);
  }
  
  set(key: string, value: string){
      return localStorage.setItem(key,value);
  }

  remove(key: string){
    return localStorage.removeItem(key);
  }

  clean(){
    return localStorage.clear();
  }

  isExist(key:string):boolean{
    if(JSON.parse(localStorage.getItem(key)!)){
      return true;
    }else{
      return false;
    }
  }
}