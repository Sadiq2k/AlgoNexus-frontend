import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  
problemId:any;
  constructor(private httpClient:HttpClient) { }

  rootUrl: string = 'http://localhost:8084';

  saveProblem(newProblem: any): Observable<any> {
    
    return this.httpClient.post<any>(`${this.rootUrl}/problem`, newProblem);
  }

  getProblem(problemId: any): Observable<any> {
    console.log(problemId);
    return this.httpClient.get<any>(`${this.rootUrl}/problem/${problemId}`);
  }
 
}
