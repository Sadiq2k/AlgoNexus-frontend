import { Component } from '@angular/core';
import { UserControllerService } from '../../user-services/services';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { User, UserResponse } from '../../user-services/models';
import { blockUser, loadUsers } from '../../adminState/admin.action';
import { Observable } from 'rxjs';
import { AdminState } from '../../adminState/admin.reducer';
import { Store } from '@ngrx/store';
import { getuserlist } from '../../adminState/admin.selecter';
import { Users } from '../../adminState/file-handler/users';
import { UserService } from '../../userService/user.service';
import Swal from 'sweetalert2';
import { Chart } from 'chart.js';
import { AdminStateService } from '../../adminState/AdminStateService/admin-state.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  isActive:string |null = null;

  toggleButton(buttonName: string): void {
    if (this.isActive === buttonName) {
      return;
    }

    switch (buttonName) {
      case 'users':
          this.adminStateService.setIsActivete(buttonName);
          this.router.navigate(['/admin/user-management']);
          break;
      case 'dashboard':
          this.adminStateService.setIsActivete(buttonName);
          this.router.navigateByUrl('/admin/dashboard');
          break;
      case 'course':
          this.adminStateService.setIsActivete(buttonName);
          this.router.navigateByUrl('/admin/courses');
          break;
          case 'problems':
          this.adminStateService.setIsActivete(buttonName);
          this.router.navigateByUrl('/admin/problems');
          break;
          case 'daily-problems':
          this.adminStateService.setIsActivete(buttonName);
          this.router.navigateByUrl('/admin/daily-problems');
          break;
      default:
        this.adminStateService.setIsActivete(buttonName);
          break;
  }
  }

  showUserManagement: boolean = false;
  users: Users[] = [];
  userRoles: { [key: string]: string } = {};
  editUser: Users | null = null;
  users$: Observable<Users[]>;
  block: boolean = false;

  constructor(
    private userControllerService: UserControllerService,
    private router: Router,
    private store: Store<AdminState>,
    private userService: UserService,
    private adminStateService:AdminStateService
  ) {
    this.users$ = this.store.select(getuserlist);
   this.isActive = adminStateService.getIsActive();
  }

  ngOnInit(): void {
    this.store.select(getuserlist).subscribe(users => {
      this.users = users;      
      this.users.forEach(user => {
        if (Array.isArray(user.role)) {
          const roles: string = user.role.map(role => role.name).join(', ');
          this.userRoles[user.id!] = roles;
        }
      });
    });

    this.store.dispatch(loadUsers());
    // console.log('User Roles:', this.userRoles);
    // this.users$.subscribe(data => console.log('Data in component:', data));

  }
 
  toggleUserManagement() {
       this.router.navigate(['admin/user-management'])

  }





}
