/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllUser } from '../fn/user-controller/get-all-user';
import { GetAllUser$Params } from '../fn/user-controller/get-all-user';
import { getLoginUser } from '../fn/user-controller/get-login-user';
import { GetLoginUser$Params } from '../fn/user-controller/get-login-user';
import { getUser } from '../fn/user-controller/get-user';
import { GetUser$Params } from '../fn/user-controller/get-user';
import { registerNewUser } from '../fn/user-controller/register-new-user';
import { RegisterNewUser$Params } from '../fn/user-controller/register-new-user';
import { setBirthday } from '../fn/user-controller/set-birthday';
import { SetBirthday$Params } from '../fn/user-controller/set-birthday';
import { setFullName } from '../fn/user-controller/set-full-name';
import { SetFullName$Params } from '../fn/user-controller/set-full-name';
import { setGender } from '../fn/user-controller/set-gender';
import { SetGender$Params } from '../fn/user-controller/set-gender';
import { setGithub } from '../fn/user-controller/set-github';
import { SetGithub$Params } from '../fn/user-controller/set-github';
import { setLinkedIn } from '../fn/user-controller/set-linked-in';
import { SetLinkedIn$Params } from '../fn/user-controller/set-linked-in';
import { setLocation } from '../fn/user-controller/set-location';
import { SetLocation$Params } from '../fn/user-controller/set-location';
import { setWork } from '../fn/user-controller/set-work';
import { SetWork$Params } from '../fn/user-controller/set-work';
import { UpdateFullNameResponse } from '../models/update-full-name-response';
import { updateUser } from '../fn/user-controller/update-user';
import { UpdateUser$Params } from '../fn/user-controller/update-user';
import { User } from '../models/user';
import { UserResponse } from '../models/user-response';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateUser()` */
  static readonly UpdateUserPath = '/users/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: UpdateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return updateUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: UpdateUser$Params, context?: HttpContext): Observable<string> {
    return this.updateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `setFullName()` */
  static readonly SetFullNamePath = '/users/updateName';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setFullName()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setFullName$Response(params: SetFullName$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateFullNameResponse>> {
    return setFullName(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setFullName$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setFullName(params: SetFullName$Params, context?: HttpContext): Observable<UpdateFullNameResponse> {
    return this.setFullName$Response(params, context).pipe(
      map((r: StrictHttpResponse<UpdateFullNameResponse>): UpdateFullNameResponse => r.body)
    );
  }

  /** Path part for operation `registerNewUser()` */
  static readonly RegisterNewUserPath = '/users/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerNewUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerNewUser$Response(params: RegisterNewUser$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return registerNewUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerNewUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerNewUser(params: RegisterNewUser$Params, context?: HttpContext): Observable<string> {
    return this.registerNewUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `setWork()` */
  static readonly SetWorkPath = '/users/add/work';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setWork()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setWork$Response(params: SetWork$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return setWork(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setWork$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setWork(params: SetWork$Params, context?: HttpContext): Observable<string> {
    return this.setWork$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `setLocation()` */
  static readonly SetLocationPath = '/users/add/location';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setLocation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setLocation$Response(params: SetLocation$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return setLocation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setLocation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setLocation(params: SetLocation$Params, context?: HttpContext): Observable<string> {
    return this.setLocation$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `setLinkedIn()` */
  static readonly SetLinkedInPath = '/users/add/linkedin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setLinkedIn()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setLinkedIn$Response(params: SetLinkedIn$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return setLinkedIn(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setLinkedIn$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setLinkedIn(params: SetLinkedIn$Params, context?: HttpContext): Observable<string> {
    return this.setLinkedIn$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `setGithub()` */
  static readonly SetGithubPath = '/users/add/github';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setGithub()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setGithub$Response(params: SetGithub$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return setGithub(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setGithub$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setGithub(params: SetGithub$Params, context?: HttpContext): Observable<string> {
    return this.setGithub$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `setGender()` */
  static readonly SetGenderPath = '/users/add/gender';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setGender()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setGender$Response(params: SetGender$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return setGender(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setGender$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setGender(params: SetGender$Params, context?: HttpContext): Observable<string> {
    return this.setGender$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `setBirthday()` */
  static readonly SetBirthdayPath = '/users/add/birth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setBirthday()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setBirthday$Response(params: SetBirthday$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return setBirthday(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setBirthday$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setBirthday(params: SetBirthday$Params, context?: HttpContext): Observable<string> {
    return this.setBirthday$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getUser()` */
  static readonly GetUserPath = '/users/{username}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser$Response(params: GetUser$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser(params: GetUser$Params, context?: HttpContext): Observable<User> {
    return this.getUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getAllUser()` */
  static readonly GetAllUserPath = '/users/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUser$Response(params?: GetAllUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserResponse>>> {
    return getAllUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUser(params?: GetAllUser$Params, context?: HttpContext): Observable<Array<UserResponse>> {
    return this.getAllUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserResponse>>): Array<UserResponse> => r.body)
    );
  }

  /** Path part for operation `getLoginUser()` */
  static readonly GetLoginUserPath = '/users/logedUser/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLoginUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoginUser$Response(params: GetLoginUser$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getLoginUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLoginUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoginUser(params: GetLoginUser$Params, context?: HttpContext): Observable<User> {
    return this.getLoginUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

}
