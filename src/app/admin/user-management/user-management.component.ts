import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../user-services/services';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { User, UserResponse } from '../../user-services/models';
import { blockUser, loadUsers, updateUser } from '../../adminState/admin.action';
import { Observable } from 'rxjs';
import { AdminState } from '../../adminState/admin.reducer';
import { Store } from '@ngrx/store';
import { getuserlist } from '../../adminState/admin.selecter';
import { Users } from '../../adminState/file-handler/users';
import { UserService } from '../../userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit{

  

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
    private userService: UserService
  ) {
    this.users$ = this.store.select(getuserlist);
  }

  ngOnInit(): void {
    this.store.select(getuserlist).subscribe(users => {
      this.users = users;
      console.log("==========",this.users);
      this.users.forEach(user => {
        if (Array.isArray(user.role)) {
          const roles: string = user.role.map(role => role.name).join(', ');
          this.userRoles[user.id!] = roles;
        }
      });
    });

    this.store.dispatch(loadUsers());
    console.log('User Roles:', this.userRoles);
    this.users$.subscribe(data => console.log('Data in component:', data));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.showUserManagement;
  }

 

  blockUser(id: string) {
    Swal.fire({
      title: 'ARE YOU SURE!',
      text: 'YOU WANT TO BLOCK THIS USER?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'CLOSE'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.blockUser(id).subscribe((res) => {
          this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/admin/user-management']);
          });
          this.block = true;
          console.log(res);
        });
      }
    });
  }

  unBlockUser(id: any) {
    Swal.fire({
      title: 'ARE YOU SURE!',
      text: 'YOU WANT TO UNBLOCK THIS USER?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'CLOSE'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.unBlockUser(id).subscribe((res) => {
          this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/admin/user-management']);
          });
          console.log(res);
        });
      }
    });
  }


}
