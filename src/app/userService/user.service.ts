import { Injectable } from '@angular/core';
import { UserAuthService } from '../auth/user-auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Users } from '../adminState/file-handler/users';
import { BlockUser$Params } from '../services/fn/authentication/block-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  PATH_OF_API = 'http://localhost:8084';

  generateToken(email: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8084/auth/generate-token/${email}`,);
  }


  unBlockUser(id: any) {
    return this.httpClient.get(`http://localhost:8084/auth/unBlock/${id}`);
  }

  blockUser(id: string) {
    return this.httpClient.get(`http://localhost:8084/auth/block/${id}`);
  }

  constructor(private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) { }


  private readonly USER_MANAGEMENT_KEY = 'showUserManagement';


  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });



  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles: any[] = this.userAuthService.getRoles() || [];
    const userRoleNames = userRoles.map(role => role.name);
    const match = userRoleNames.some(userRole => allowedRoles.includes(userRole));
    return match;

  }

  getUserProfile(userId: string): Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    // console.log(userId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get(this.PATH_OF_API + `/users/logedUser/${userId}`, httpOptions);
  }

  getImageByUserId(userId: string): Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get(this.PATH_OF_API + `/cloudinary/${userId}`, httpOptions);
  }


  expiredToken(token: string) {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get(this.PATH_OF_API + `/users/token-expired/${token}`, httpOptions);
  }

  getTotalCountOfDifficulty(): Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get(this.PATH_OF_API + `/difficulty/get`, httpOptions);
  }

  
  getCountSolvedProblems(userId: string): Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get(this.PATH_OF_API + `/submit-solution/solved-problems-by-difficulty/${userId}`, httpOptions);
  }

  getRecentSubmission(userId: any): Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get(this.PATH_OF_API + `/submit-solution/recent-sub/${userId}`, httpOptions);
  }

  getAllUsers(page: number, size: number): Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      }),
      params: new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
    };
    return this.httpClient.get(`${this.PATH_OF_API}/users/users`, httpOptions);
  }


  getTotalUsers() {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get(this.PATH_OF_API + `/users/getAllUsersCount`, httpOptions);
  }

  getTotalProblem() {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get(this.PATH_OF_API + `/problem/getTotalProblem`, httpOptions);
  }

  getTotalCourse() {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get(this.PATH_OF_API + `/courses/getTotalCourse`, httpOptions);
  }

  getTotalSubmission() {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get(this.PATH_OF_API + `/submit-solution/getTotalSubmission`, httpOptions);
  }

  getTotalAcceptence() {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    return this.httpClient.get(this.PATH_OF_API + `/submit-solution/getTotalAcceptence`, httpOptions);
  }


  getAllSocialMediaUsers(page:number,size:number):Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      }),
      params: new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
    };
    return this.httpClient.get(this.PATH_OF_API + `/users/all/social-media`,httpOptions);

  }

  getRegistrationUsers():Observable<any> {
    return this.httpClient.get(this.PATH_OF_API + `/users/registrations-per-month`);  }
 


}
