import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { DataShareService } from '../../dataShare/data-share.service';
import { UserService } from '../../userService/user.service';
import { Subscription, interval } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent implements OnInit {


  message: string = '';
  submitted: boolean = false;
  isOkay: boolean = true;
  email: string = "";
  otpValidity: number = 10;
  isActivated: boolean = false;
  isRegisterActive: boolean = false;
  tokens: string = '';
  userId: string = '';
  resendOtp: boolean = false;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dataShare: DataShareService,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.setEmail();
    setTimeout(()=>{
      this.onStart();
    },1000)

  }

  minutes: number = 1;
  seconds: number = 0;
  count = interval(1000);
  subscription: Subscription | undefined;
  isRunning = false;

  onStart() {
    this.resendOtp = false; 
    this.isRunning = true;
    this.minutes = 1; // Reset minutes
    this.seconds = 0; // Reset seconds
    this.subscription = this.count.subscribe(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.onStop();
          return;
        }
        this.minutes--;
        this.seconds = 59;
      } else {
        this.seconds--;
      }
    });
  }

  onStop() {
    this.resendOtp = true;
    this.isRunning = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setEmail() {

    this.route.paramMap.subscribe(params => {
      this.isActivated = params.get('isActivated') === 'true';
      this.isRegisterActive = params.get('isRegisterActive') === 'true';

      let a = this.dataShare.getEmail()
      if (a) {
        this.email = this.dataShare.getEmail();
      } else {
        this.email = params.get('email') || '';
        if (this.email) {
        }
      }
      this.userId = params.get('userId') || '';

    });
  }

  onCodeCompleted(token: string): void {
    this.tokens = token;
    this.confirmAccount(token);
  }

  private confirmAccount(token: string): void {
    console.log("isActived", this.isActivated, " isOkey:", this.isOkay, "email:", this.email);
    this.authService.confirm({ token }).subscribe({
      next: (res) => {
        console.log(res);
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login'
        this.submitted = true;
        this.isOkay = true;
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Account Activated',
        //   text: 'Your account has been successfully activated. Now you can proceed to login',
        //   confirmButtonText: 'OK'
        // });

      }, error: (err): void => {
        if (err.status === 403) {
          // Check if the error is due to token expiration (403 Forbidden)
          console.log(">>>>>>>", err)
          console.log('Token expired. Regenerating new token...');
          this.submitted = true;

        }
        this.message = 'Token has been invalid';
        this.submitted = true;
        this.isOkay = false;
      }
    })
  }

  generateNewToken(): void {
    this.resendOtp = false;
    
    this.userService.generateToken(this.email).subscribe({
      next: (res) => {
        console.log('New token generated:', res);
        this.onStart();
        
      },
      error: (err: any) => {
        console.error('Error generating new token:', err);
        this.message = 'Failed to generate a new token !..';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  redirectToNewPassword() {
    this.dataShare.setEmail(this.email);
    this.router.navigate(['new-password-add']);
  }
}
