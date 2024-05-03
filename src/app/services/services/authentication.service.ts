/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authenticate } from '../fn/authentication/authenticate';
import { Authenticate$Params } from '../fn/authentication/authenticate';
import { AuthenticationResponse } from '../models/authentication-response';
import { blockUser } from '../fn/authentication/block-user';
import { BlockUser$Params } from '../fn/authentication/block-user';
import { confirm } from '../fn/authentication/confirm';
import { Confirm$Params } from '../fn/authentication/confirm';
import { forgotPassword } from '../fn/authentication/forgot-password';
import { ForgotPassword$Params } from '../fn/authentication/forgot-password';
import { ForgotPasswordResponse } from '../models/forgot-password-response';
import { generateToken } from '../fn/authentication/generate-token';
import { GenerateToken$Params } from '../fn/authentication/generate-token';
import { getRole } from '../fn/authentication/get-role';
import { GetRole$Params } from '../fn/authentication/get-role';
import { isUserBlocked } from '../fn/authentication/is-user-blocked';
import { IsUserBlocked$Params } from '../fn/authentication/is-user-blocked';
import { register } from '../fn/authentication/register';
import { Register$Params } from '../fn/authentication/register';
import { unBlockUser } from '../fn/authentication/un-block-user';
import { UnBlockUser$Params } from '../fn/authentication/un-block-user';
import { updatePassword } from '../fn/authentication/update-password';
import { UpdatePassword$Params } from '../fn/authentication/update-password';
import { UpdatePasswordResponse } from '../models/update-password-response';
import { verifyPassword } from '../fn/authentication/verify-password';
import { VerifyPassword$Params } from '../fn/authentication/verify-password';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `verifyPassword()` */
  static readonly VerifyPasswordPath = '/auth/verify-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyPassword$Response(params: VerifyPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return verifyPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `verifyPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyPassword(params: VerifyPassword$Params, context?: HttpContext): Observable<string> {
    return this.verifyPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `updatePassword()` */
  static readonly UpdatePasswordPath = '/auth/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePassword$Response(params: UpdatePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdatePasswordResponse>> {
    return updatePassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updatePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePassword(params: UpdatePassword$Params, context?: HttpContext): Observable<UpdatePasswordResponse> {
    return this.updatePassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<UpdatePasswordResponse>): UpdatePasswordResponse => r.body)
    );
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<string> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `forgotPassword()` */
  static readonly ForgotPasswordPath = '/auth/forgot';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgotPassword$Response(params: ForgotPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<ForgotPasswordResponse>> {
    return forgotPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgotPassword(params: ForgotPassword$Params, context?: HttpContext): Observable<ForgotPasswordResponse> {
    return this.forgotPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<ForgotPasswordResponse>): ForgotPasswordResponse => r.body)
    );
  }

  /** Path part for operation `authenticate()` */
  static readonly AuthenticatePath = '/auth/authenticate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate$Response(params: Authenticate$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authenticate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate(params: Authenticate$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.authenticate$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `getRole()` */
  static readonly GetRolePath = '/auth/user-role/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRole$Response(params: GetRole$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getRole(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRole(params: GetRole$Params, context?: HttpContext): Observable<string> {
    return this.getRole$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `unBlockUser()` */
  static readonly UnBlockUserPath = '/auth/unBlock/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unBlockUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  unBlockUser$Response(params: UnBlockUser$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return unBlockUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `unBlockUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unBlockUser(params: UnBlockUser$Params, context?: HttpContext): Observable<boolean> {
    return this.unBlockUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `isUserBlocked()` */
  static readonly IsUserBlockedPath = '/auth/isBlocked/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `isUserBlocked()` instead.
   *
   * This method doesn't expect any request body.
   */
  isUserBlocked$Response(params: IsUserBlocked$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return isUserBlocked(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `isUserBlocked$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  isUserBlocked(params: IsUserBlocked$Params, context?: HttpContext): Observable<boolean> {
    return this.isUserBlocked$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `generateToken()` */
  static readonly GenerateTokenPath = '/auth/generate-token/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generateToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  generateToken$Response(params: GenerateToken$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return generateToken(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `generateToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  generateToken(params: GenerateToken$Params, context?: HttpContext): Observable<void> {
    return this.generateToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `blockUser()` */
  static readonly BlockUserPath = '/auth/block/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `blockUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  blockUser$Response(params: BlockUser$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return blockUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `blockUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  blockUser(params: BlockUser$Params, context?: HttpContext): Observable<boolean> {
    return this.blockUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `confirm()` */
  static readonly ConfirmPath = '/auth/activate-account';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirm()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm$Response(params: Confirm$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return confirm(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `confirm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm(params: Confirm$Params, context?: HttpContext): Observable<void> {
    return this.confirm$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
