import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserAuthService } from './user-auth.service';
import { AuthenticationService } from '../services/services';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../userService/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
       role: any;

  constructor(private userAuthService:UserAuthService,
    private router:Router,
    private userService:UserService,
    ){}

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   
      if(this.userAuthService.getToken() !==null){
       const role = route.data['roles'] as Array<string>
       if(role){
        const match = this.userService.roleMatch(role);
        if(match){
         return true;
        }else{
         this.router.navigate(['/forbidden']);
         return false;
        }
       }
      }
   
      this.router.navigate(['login'])
      return false
     }
    

  
  
}
