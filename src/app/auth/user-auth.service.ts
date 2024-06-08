  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class UserAuthService {

    constructor() {}

    public setRoles(roles: any[]) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }

    public getRoles(): string[] | null {
      const rolesJson = localStorage?.getItem('roles');
      return rolesJson ? JSON.parse(rolesJson) : null;
  }

    public setToken(jwtToken: string) {
      localStorage.setItem('jwtToken', jwtToken);
    }

    getToken(): string | null {
      const token = localStorage.getItem('jwtToken');
      return token ? token : null;
    }
    

  public setUserId(userId:string){
    localStorage.setItem('userId',JSON.stringify(userId));
  }
  public getUserId(){
    const userIdJson = localStorage?.getItem('userId');
    return userIdJson ? JSON.parse(userIdJson) : null;
  }

    public clear() {
      localStorage.clear();
    }

    public isLoggedIn() {
      return this.getRoles() && this.getToken();
    }

    public hasRole(role: string): boolean {
      const roles = this.getRoles();
      console.log("roles in authguard: ",roles)
      return roles ? roles.includes(role) : false;
    }
    
  }
