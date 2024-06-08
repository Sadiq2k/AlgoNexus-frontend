import { Injectable } from '@angular/core';
import { User } from '../services/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  //this all data is user 
  userDetails: any;

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
  setRole(roles: any) {
    this.role = roles;
    console.log("share data service", this.role);
  }
  getRole() {
    return this.role;
  }

  //This all data is problem related

  private formDataSubject = new BehaviorSubject<any>(null);
  formData$ = this.formDataSubject.asObservable();

  sendFormDataQuestion(formData: any) {
    this.formDataSubject.next(formData);
  }


  private formDataSolution = new BehaviorSubject<any>(null);
  formDataSolution$ = this.formDataSolution.asObservable();

  sendFormDataSolution(editorContent: any) {
    this.formDataSolution.next(editorContent);
  }


  private formDataExplanation = new BehaviorSubject<any>(null);
  formDataExplanation$ = this.formDataExplanation.asObservable();

  sendFormDataExplanation(editorContent: any) {
    this.formDataExplanation.next(editorContent);
  }

  private formDataTestCase = new BehaviorSubject<any>(null);
  formDataTestCase$ = this.formDataTestCase.asObservable();

  sendFormDataTestCase(testcaseData: any) {
    this.formDataTestCase.next(testcaseData);
  }

  private formDataConstraints = new BehaviorSubject<any>(null);
  formDataConstraints$ = this.formDataConstraints.asObservable();

  sendCanstraints(constraints: any) {
    this.formDataConstraints.next(constraints)
  }

  private formDataCourse = new BehaviorSubject<any>(null);
  formDataCourse$ = this.formDataCourse.asObservable();

  sendFormCourse(course: any) {
    this.formDataCourse.next(course);

  }



}
