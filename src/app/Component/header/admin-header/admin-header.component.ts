import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../auth/user-auth.service';
import { DataShareService } from '../../../dataShare/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent implements OnInit {

  role: any;
  token: string = '';
  isLoggedIn: boolean = false;

  constructor(private userAuthService: UserAuthService,
    private router: Router,
    private dataShareSerivce: DataShareService
  ) { }

  ngOnInit(): void {

  }

  getingRole() {
    this.role = this.dataShareSerivce.getRole();
    console.log("header", this.role);
  }

  loggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  login() {
    this.router.navigate(['login']);
  }

  logOut() {
    this.userAuthService.clear();
    this.router.navigate(['login']);
  }

  toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }



}
