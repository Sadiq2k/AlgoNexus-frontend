import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { AuthenticationResponse } from '../../services/models';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAuthService } from '../../auth/user-auth.service';
import { DataShareService } from '../../dataShare/data-share.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router,
    private authService:AuthenticationService,
    private userAuthService:UserAuthService,
    private dataShare: DataShareService,
    private fb: FormBuilder
    
   ){}

   ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.signupForm.valueChanges.subscribe(() => {
      if (this.signupForm.valid) {
        this.errorMessage = '';
      }
    });
  
  }
  // Custom validation messages
  get firstname() { return this.signupForm.get('firstname'); }
  get lastname() { return this.signupForm.get('lastname'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

 
  
   register(): void {
    this.signupForm.markAllAsTouched();
    
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    } 
  
   this.authService.register({ body: this.signupForm.value }).subscribe({
    next: (res) => { // Accept any type for response
      console.log('User created successfully.');
      this.dataShare.setEmail(this.signupForm.get('email')?.value);
      this.router.navigate(['activate-account', { isRegisterActive: true, email: this.signupForm.value.email }]);
    },
    
    error: (err: HttpErrorResponse) => {
      console.error(err);
      if (err.error.validationErrors) {
        this.errorMessage = err.error.validationErrors;
      } else {
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    }
  });
  }
  
   clearSuccessMessage(): void {
     this.successMessage = '';
   }

   





}
