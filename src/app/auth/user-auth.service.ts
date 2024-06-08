  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class UserAuthService {

  //   constructor() {}

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


  constructor() {}

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  public setRoles(roles: any[]) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  public getRoles(): string[] | null {
    if (this.isLocalStorageAvailable()) {
      const rolesJson = localStorage.getItem('roles');
      return rolesJson ? JSON.parse(rolesJson) : null;
    }
    return null;
  }

  public setToken(jwtToken: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('jwtToken', jwtToken);
    }
  }

  public getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('jwtToken');
      return token || null;
    }
    return null;
  }

  public setUserId(userId: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('userId', JSON.stringify(userId));
    }
  }

  public getUserId(): string | null {
    if (this.isLocalStorageAvailable()) {
      const userIdJson = localStorage.getItem('userId');
      return userIdJson ? JSON.parse(userIdJson) : null;
    }
    return null;
  }

  public clear() {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
  }

  public isLoggedIn(): boolean {
    return !!this.getRoles() && !!this.getToken();
  }

  public hasRole(role: string): boolean {
    const roles = this.getRoles();
    console.log("roles in authguard: ", roles);
    return roles ? roles.includes(role) : false;
  }
    
  }
