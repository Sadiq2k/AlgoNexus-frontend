import { Injectable } from '@angular/core';
import { User } from '../services/models';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

userDetails:any;

setLogedUser(user: User | undefined) {
  localStorage.setItem('userDetails', JSON.stringify(user));
  console.log("User details saved in local storage:", user);
}

getUserDetails(): User | undefined {
  const userDetailsString = localStorage.getItem('userDetails');
  if (userDetailsString) {
    return JSON.parse(userDetailsString) as User;
  } else {
    return undefined;
  }
}

  role: any;

  constructor() { }

  private email: string = '';
  

  setEmail(email: string) {
    this.email = email;
    console.log(this.email);
  }

  getEmail(): string {
    return this.email;
  }
  setRole(roles:any){
    this.role = roles;
    console.log("share data service",this.role);
  }
  getRole(){
    return this.role;
  }


}
