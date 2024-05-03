import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../auth/user-auth.service';
import { DataShareService } from '../../dataShare/data-share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

      role:any;
      token:string='';

  constructor(private userAuthService:UserAuthService,
    private router:Router,
    private dataShareSerivce:DataShareService
  ){}

  ngOnInit(): void {
 
    
  }

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
    this.router.navigate(['home']);
    }

    isLoggedIn: boolean = false;

 
    toggleLogin(): void {
      this.isLoggedIn = !this.isLoggedIn;
    }



}
