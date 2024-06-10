import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserAuthService } from '../auth/user-auth.service';
import { GetDailyProblem$Params } from '../dailyProblem-services/fn/daily-problem-controller/get-daily-problem';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {


  problemId: any;
  constructor(private httpClient: HttpClient,
    private userAuthService:UserAuthService
  ) { }

  rootUrl: string = 'https://api.algonexus.online';

  saveProblem(newProblem: any): Observable<any> {

    return this.httpClient.post<any>(`${this.rootUrl}/problem`, newProblem);
  }

  getProblem(problemId: any): Observable<any> {
    // console.log(problemId);
    return this.httpClient.get<any>(`${this.rootUrl}/problem/${problemId}`);
  }

  getAllCategory(): Observable<any> {
    return this.httpClient.get<any>(`${this.rootUrl}/category/get`);
  }

  getAllCategoties(category:boolean): Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      }),
      params: new HttpParams()
        .set('category', category)
    };
    return this.httpClient.get<any>(`${this.rootUrl}/category/get`, httpOptions);
  }

  addCategory(categoryForm: FormGroup): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const categoryData = categoryForm.value; // Extract form values
    console.log(categoryData)
    return this.httpClient.post<any>(`${this.rootUrl}/category/add`, JSON.stringify(categoryData), { headers });
  }

  checkExistsTitleOrNot(title: string): Observable<any>  {
    return this.httpClient.get<any>(`${this.rootUrl}/problem/title/${title}`);
  }

  getAllSubmissions(userId: string, page: number, size: number) {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      }),
      params: new HttpParams()
        .set('userId', userId)
        .set('page', page.toString())
        .set('size', size.toString())
    };
    return this.httpClient.get(`${this.rootUrl}/submit-solution/get/all/submissions`, httpOptions);
  }

  getDailyProblemList(page:number,size:number):Observable<any>{
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      }),
      params: new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
    };
    return this.httpClient.get<any>(`${this.rootUrl}/daily-problem/get/problem/list`,httpOptions);
  }


  getLatestCourse() {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      }),
      
    };
    return this.httpClient.get<any>(`${this.rootUrl}/courses/latest`,httpOptions);
  }
 
}
