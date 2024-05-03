import { Component } from '@angular/core';
import { UserAuthService } from '../../../auth/user-auth.service';
import { DataShareService } from '../../../dataShare/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

  role:any;
  token:string='';

  constructor(private userAuthService:UserAuthService,
    private router:Router,
    private dataShareSerivce:DataShareService
  ){}
  
getingRole(){
  this.role= this.dataShareSerivce.getRole();
  console.log("header",this.role);
 }
 
 
   loggedIn() {
     return this.userAuthService.isLoggedIn();
     }
 
     login(){
       this.router.navigate(['login']);
     }
 
     logOut() {
     this.userAuthService.clear();
     this.router.navigate(['login']);
     }
 
     isLoggedIn: boolean = false;
 
  
     toggleLogin(): void {
       this.isLoggedIn = !this.isLoggedIn;
     }
 
}
