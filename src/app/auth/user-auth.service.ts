  import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class UserAuthService {

    // constructor() {}

  //   public setRoles(roles: any[]) {
  //     localStorage.setItem('roles', JSON.stringify(roles));
  //   }

  //   public getRoles(): string[] | null {
  //     const rolesJson = localStorage?.getItem('roles');
  //     return rolesJson ? JSON.parse(rolesJson) : null;
  // }

  //   public setToken(jwtToken: string) {
  //     localStorage.setItem('jwtToken', jwtToken);
  //   }

  //   public getToken(): string|null {
  //     const token = localStorage?.getItem('jwtToken');
  //     return token || ''; 
  // }
  // public setUserId(userId:string){
  //   localStorage.setItem('userId',JSON.stringify(userId));
  // }
  // public getUserId(){
  //   const userIdJson = localStorage?.getItem('userId');
  //   return userIdJson ? JSON.parse(userIdJson) : null;
  // }

  //   public clear() {
  //     localStorage.clear();
  //   }

  //   public isLoggedIn() {
  //     return this.getRoles() && this.getToken();
  //   }

  //   public hasRole(role: string): boolean {
  //     const roles = this.getRoles();
  //     console.log("roles in authguard: ",roles)
  //     return roles ? roles.includes(role) : false;
  //   }
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public setRoles(roles: any[]) {
    if (this.isBrowser) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  public getRoles(): string[] | null {
    if (this.isBrowser) {
      const rolesJson = localStorage.getItem('roles');
      return rolesJson ? JSON.parse(rolesJson) : null;
    }
    return null;
  }

  public setToken(jwtToken: string) {
    if (this.isBrowser) {
      localStorage.setItem('jwtToken', jwtToken);
    }
  }

  public getToken(): string | null {
    if (this.isBrowser) {
      const token = localStorage.getItem('jwtToken');
      return token || '';
    }
    return null;
  }

  public setUserId(userId: string) {
    if (this.isBrowser) {
      localStorage.setItem('userId', JSON.stringify(userId));
    }
  }

  public getUserId() {
    if (this.isBrowser) {
      const userIdJson = localStorage.getItem('userId');
      return userIdJson ? JSON.parse(userIdJson) : null;
    }
    return null;
  }

  public clear() {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }

  public isLoggedIn() {
    return this.isBrowser && this.getRoles() && this.getToken();
  }

  public hasRole(role: string): boolean {
    const roles = this.getRoles();
    console.log("roles in authguard: ", roles);
    return roles ? roles.includes(role) : false;
  }
    
  }
