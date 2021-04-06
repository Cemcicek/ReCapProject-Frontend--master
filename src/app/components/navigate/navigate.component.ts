import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';


@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {

  constructor(private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastr:ToastrService,
    private router:Router) { }

    
  ngOnInit(): void {
   
  }

 isAuthenticated(){
   return this.authService.isAuthenticated();
 }

 logOut(){
   this.localStorageService.clean();
   this.router.navigate(['/register']);
 }

}