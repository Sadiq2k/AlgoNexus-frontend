import { Injectable } from '@angular/core';
import { UserAuthService } from '../auth/user-auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../adminState/file-handler/users';
import { BlockUser$Params } from '../services/fn/authentication/block-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  generateToken(email:string): Observable<any> {
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

  // PATH_OF_API = "http://localhost:8081";
  private readonly USER_MANAGEMENT_KEY = 'showUserManagement';


  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });



  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles: any[] = this.userAuthService.getRoles() || [];
    console.log("User roles:", userRoles);
    console.log("Allowed roles:", allowedRoles);

    // Extract role names from userRoles array
    const userRoleNames = userRoles.map(role => role.name);
    console.log("User role names:", userRoleNames);

    // Check if any of the user's roles match the allowed roles
    const match = userRoleNames.some(userRole => allowedRoles.includes(userRole));
    console.log("Match:", match);
    return match;

  }



  PATH_OF_API = 'http://localhost:8084';

  getUserProfile(userId:string): Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    console.log(userId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
     

    };
    return this.httpClient.get(this.PATH_OF_API + `/users/logedUser/${userId}`, httpOptions);
  }

  getImageByUserId(userId:string): Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    console.log(userId);
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

}
