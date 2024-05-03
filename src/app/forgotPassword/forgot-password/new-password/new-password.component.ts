import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/services';
import { UpdatePasswordRequest, UpdatePasswordResponse } from '../../../services/models';
import { DataShareService } from '../../../dataShare/data-share.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  passwordForm!: FormGroup;
  submitted: boolean = false;
  errorMessage: string = '';
  pageEmail: string = "";
  showPopup:boolean =false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private dataShare:DataShareService
  ) { }

  ngOnInit(): void {
    this.initForm();
   this.pageEmail = this.dataShare.getEmail();
  }


  initForm(): void {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }



  onSubmit(): void {
    if (this.passwordForm.invalid) {
        this.errorMessage = 'Please fill out all required fields.';
        return;
    }
    const updatePassword: UpdatePasswordRequest = {
      email: this.pageEmail,
      password: this.passwordForm.value['password'],
      confirmpassword: this.passwordForm.value['confirmpassword']
    };

    console.log("email new pass component:",this.pageEmail); 
    console.log(this.passwordForm.value); // Log form value only if it's valid
    this.authService.updatePassword({ body: updatePassword }).subscribe({
        next: (response: UpdatePasswordResponse) => {
            this.submitted = true;
            // Handle successful response, if needed
            console.log(response);
            this.showPopup = true;
            setTimeout(() => {
              this.showPopup = false;
              // Navigate to the login page after hiding the message
              this.router.navigate(['/login']);
            }, 3000);
        },
        error: (error) => {
            // Handle error, such as displaying an error message
            console.error('Error occurred while updating password:', error);
        }
    });
}

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
