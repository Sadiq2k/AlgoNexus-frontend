/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { assingDailyProblem } from '../fn/daily-problem-controller/assing-daily-problem';
import { AssingDailyProblem$Params } from '../fn/daily-problem-controller/assing-daily-problem';
import { DailyProblemResponse } from '../models/daily-problem-response';
import { getDailyProblem } from '../fn/daily-problem-controller/get-daily-problem';
import { GetDailyProblem$Params } from '../fn/daily-problem-controller/get-daily-problem';
import { isTodayProblem } from '../fn/daily-problem-controller/is-today-problem';
import { IsTodayProblem$Params } from '../fn/daily-problem-controller/is-today-problem';

@Injectable({ providedIn: 'root' })
export class DailyProblemControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `assingDailyProblem()` */
  static readonly AssingDailyProblemPath = '/daily-problem/set';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `assingDailyProblem()` instead.
   *
   * This method doesn't expect any request body.
   */
  assingDailyProblem$Response(params?: AssingDailyProblem$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return assingDailyProblem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `assingDailyProblem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  assingDailyProblem(params?: AssingDailyProblem$Params, context?: HttpContext): Observable<void> {
    return this.assingDailyProblem$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `isTodayProblem()` */
  static readonly IsTodayProblemPath = '/daily-problem/isTodayProblem';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `isTodayProblem()` instead.
   *
   * This method doesn't expect any request body.
   */
  isTodayProblem$Response(params: IsTodayProblem$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return isTodayProblem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `isTodayProblem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  isTodayProblem(params: IsTodayProblem$Params, context?: HttpContext): Observable<boolean> {
    return this.isTodayProblem$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getDailyProblem()` */
  static readonly GetDailyProblemPath = '/daily-problem/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDailyProblem()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDailyProblem$Response(params: GetDailyProblem$Params, context?: HttpContext): Observable<StrictHttpResponse<DailyProblemResponse>> {
    return getDailyProblem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDailyProblem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDailyProblem(params: GetDailyProblem$Params, context?: HttpContext): Observable<DailyProblemResponse> {
    return this.getDailyProblem$Response(params, context).pipe(
      map((r: StrictHttpResponse<DailyProblemResponse>): DailyProblemResponse => r.body)
    );
  }

}
