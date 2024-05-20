import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { UserAuthService } from '../../auth/user-auth.service';
import { Role } from '../../services/models';
import { DataShareService } from '../../dataShare/data-share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMsg!: string[];
  shareRole: any='';
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userAuthService: UserAuthService,
    private fb: FormBuilder,
    private dataSharing:DataShareService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginForm.valid) {
        this.errorMsg = [];
      }
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMsg = [];
    const authRequest = this.loginForm.value;
    this.authService.authenticate({ body: authRequest }).subscribe({
      next: (res) => {
        console.log(res.user?.id);
        const userEmail = res.user?.email ?? '';
       this.dataSharing.setEmail(userEmail);
       
        this.userAuthService.setUserId(res.user?.id as string);
        this.userAuthService.setToken(res.token as string);
        if (res.user?.roles) {
          // Extract and set the roles
          const roles: Role[] = res.user?.roles ;
          this.userAuthService.setRoles(roles);
        }
        this.loading = false;
        // Route the user based on their role
        const role: string | undefined = res.user?.roles?.[0].name;
        console.log("roles: ", role);
      
        if (role === 'ADMIN') {
          
          this.router.navigate(['/admin/dashboard']);
        } else {
          console.log(res.user?.id)
          this.router.navigate(['/userProfile',{ email: res.user?.email } ]);
        }
       
          this.dataSharing.setRole(role);
      
        
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          console.log(err.error.error);
          this.errorMsg.push(err.error.error);
        }
      }
    });
  }

 
}
