/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addProblem } from '../fn/problem-controller/add-problem';
import { AddProblem$Params } from '../fn/problem-controller/add-problem';
import { AddProblemResponse } from '../models/add-problem-response';
import { getAllProblems } from '../fn/problem-controller/get-all-problems';
import { GetAllProblems$Params } from '../fn/problem-controller/get-all-problems';
import { getProblem } from '../fn/problem-controller/get-problem';
import { GetProblem$Params } from '../fn/problem-controller/get-problem';
import { Problem } from '../models/problem';
import { ProblemVerificationResponse } from '../models/problem-verification-response';
import { verifyProblem } from '../fn/problem-controller/verify-problem';
import { VerifyProblem$Params } from '../fn/problem-controller/verify-problem';

@Injectable({ providedIn: 'root' })
export class ProblemControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllProblems()` */
  static readonly GetAllProblemsPath = '/problem';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProblems()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProblems$Response(params?: GetAllProblems$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Problem>>> {
    return getAllProblems(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllProblems$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProblems(params?: GetAllProblems$Params, context?: HttpContext): Observable<Array<Problem>> {
    return this.getAllProblems$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Problem>>): Array<Problem> => r.body)
    );
  }

  /** Path part for operation `addProblem()` */
  static readonly AddProblemPath = '/problem';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProblem()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProblem$Response(params: AddProblem$Params, context?: HttpContext): Observable<StrictHttpResponse<AddProblemResponse>> {
    return addProblem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addProblem$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProblem(params: AddProblem$Params, context?: HttpContext): Observable<AddProblemResponse> {
    return this.addProblem$Response(params, context).pipe(
      map((r: StrictHttpResponse<AddProblemResponse>): AddProblemResponse => r.body)
    );
  }

  /** Path part for operation `verifyProblem()` */
  static readonly VerifyProblemPath = '/problem/verify-problem';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyProblem()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyProblem$Response(params: VerifyProblem$Params, context?: HttpContext): Observable<StrictHttpResponse<ProblemVerificationResponse>> {
    return verifyProblem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `verifyProblem$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyProblem(params: VerifyProblem$Params, context?: HttpContext): Observable<ProblemVerificationResponse> {
    return this.verifyProblem$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProblemVerificationResponse>): ProblemVerificationResponse => r.body)
    );
  }

  /** Path part for operation `getProblem()` */
  static readonly GetProblemPath = '/problem/{problemId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProblem()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblem$Response(params: GetProblem$Params, context?: HttpContext): Observable<StrictHttpResponse<Problem>> {
    return getProblem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProblem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblem(params: GetProblem$Params, context?: HttpContext): Observable<Problem> {
    return this.getProblem$Response(params, context).pipe(
      map((r: StrictHttpResponse<Problem>): Problem => r.body)
    );
  }

}
