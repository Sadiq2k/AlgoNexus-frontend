import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ForgotPasswordResponse } from '../../services/models';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  errorMessage: string = '';
  forgotPasswordEmail:string='';

  constructor(private router: Router,
    private passwordService: AuthenticationService,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.errorMessage = '';

  }
  get email() { return this.forgotPasswordForm.get('email'); }


  forgotPassword(): void {
    
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }


    this.passwordService.forgotPassword({ body: this.forgotPasswordForm.value }).subscribe({
      next: (res: ForgotPasswordResponse) => {
        if (res.errorMessage) {
          console.log(this.forgotPasswordForm.value);
          this.errorMessage = res.errorMessage;
          return;
        }
        if (res.token) {
          console.log('Password reset email sent successfully.');
          console.log(res);
          this.forgotPasswordEmail = this.forgotPasswordForm.value.email;
          this.router.navigate(['activate-account', { isActivated: true, email: this.forgotPasswordEmail }]);

        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error;
       
      }
    });
  }

}
