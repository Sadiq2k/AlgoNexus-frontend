import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/services';
import { UserAuthService } from '../../auth/user-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  changePasswordForm!: FormGroup;
  errorMsg: string = '';
  userId: string | null = null;
  showDialog: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userAuthService: UserAuthService,
    private router: Router,
    private dialogRef: MatDialogRef<ResetPasswordComponent>,
    private snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    this.userId = this.userAuthService.getUserId();
    console.log(this.userId);

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]], // Fixed here
      id: [this.userId || '']
    });

    this.changePasswordForm.valueChanges.subscribe(() => {
      if (this.changePasswordForm.valid) {
        this.errorMsg = '';
      }
    });
  }

  // Custom validation messages
  get currentpassword() { return this.changePasswordForm.get('currentPassword'); }
  get newpassword() { return this.changePasswordForm.get('newPassword'); }
  get confirmpassword() { return this.changePasswordForm.get('confirmPassword'); }

  onSaveChanges(): void {
    this.changePasswordForm.markAllAsTouched();
    const passwords = this.changePasswordForm.value;
    if(passwords.newPassword != passwords.confirmPassword){
        this.errorMsg ="new password or confirm password incorrect";
        return;
    }
    this.authService.verifyPassword({ body: passwords }).subscribe({
      next: (response) => {
        this.dialogRef.close();
        this.openSnackBar('Password successfully updated', 'Close');
      },
      error: (err: HttpErrorResponse) => {
        if (err.error && err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg = 'password is incorrect. Please try again.';
        }
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000 ,
      panelClass: ['green-snackbar'] 
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

 
}
