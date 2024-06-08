import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../auth/user-auth.service';
import { CloudinaryImageControllerService } from '../../../user-services/services';
import { UserService } from '../../../userService/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ResetPasswordComponent } from '../../../forgotPassword/reset-password/reset-password.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent implements OnInit {

  userId!: string;
  bsModalRef!: BsModalRef;

  constructor(
    private userService: UserService,
    private cloudinaryImageControllerService: CloudinaryImageControllerService,
    private userAuthService: UserAuthService,
    private dialog: MatDialog,
    private router:Router
  ) { }

  userAccount: any;

  ngOnInit(): void {
    this.userId = this.userAuthService.getUserId();
    console.log(this.userId);
    this.loadUserProfile(this.userId);
  }


  loadUserProfile(userId: string): void {
    this.userService.getUserProfile(userId).subscribe({
      next: (userProfile) => {
        this.userAccount = userProfile;
        this.cloudinaryImageControllerService.getImageByUserId(this.userAccount.id).subscribe({
          next: (userImages) => {
            this.userAccount.images = userImages;
          },
        
        });
      },
      error: (error) => {
        console.log("this error occur is user account",error);
        if(error.status == 503){
          this.router.navigate(['/server-down'])
          
        }
      }
    });
  }



  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
