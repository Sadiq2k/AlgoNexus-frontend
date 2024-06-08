import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AdminState } from '../../adminState/admin.reducer';
import { Store } from '@ngrx/store';
import { UserService } from '../../userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {



  showUserManagement: boolean = false;
  users: any;
  userRoles: { [key: string]: string } = {};
  block: boolean = false;

  page: number = 0;
  size: number = 15;
  totalPages: number = 0;
  totalElements: number = 0;

  constructor(
    private router: Router,
    private store: Store<AdminState>,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getAllUsers(this.page, this.size)
  }

  getAllUsers(page: number, size: number) {

    this.userService.getAllUsers(page, size).subscribe({
      next: (res) => {
        this.users = res;
        this.totalPages = this.users.totalPages
      }
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.showUserManagement;
  }

  goToPage(page: number): void {
    this.page = page;
    this.getAllUsers(this.page, this.size);
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      console.log(this.page)
      this.getAllUsers(this.page, this.size);
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.getAllUsers(this.page, this.size);
    }
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
