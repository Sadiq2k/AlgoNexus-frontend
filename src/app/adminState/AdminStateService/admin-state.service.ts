import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../../auth/user-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminStateService {

  constructor(private userAuthService:UserAuthService,
    private httpClient:HttpClient
  ) { }


  // getLanguage():Observable<any> {
  //   const jwtToken = this.userAuthService.getToken();
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${jwtToken}`
  //     })
     

  //   };
  //   return this.httpClient.get( `/34.93.145.38:2358/languages`, httpOptions);
  // }

  isActive: string | null = null;

  public setIsActivete(buttonName: string | null){
    this.isActive = buttonName;
  }
  public getIsActive(){
    return this.isActive;
  }

 
}
