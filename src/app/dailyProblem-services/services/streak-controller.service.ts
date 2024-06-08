/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addStreak } from '../fn/streak-controller/add-streak';
import { AddStreak$Params } from '../fn/streak-controller/add-streak';
import { getDailyStreak } from '../fn/streak-controller/get-daily-streak';
import { GetDailyStreak$Params } from '../fn/streak-controller/get-daily-streak';
import { getStreak } from '../fn/streak-controller/get-streak';
import { GetStreak$Params } from '../fn/streak-controller/get-streak';

@Injectable({ providedIn: 'root' })
export class StreakControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addStreak()` */
  static readonly AddStreakPath = '/streak/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addStreak()` instead.
   *
   * This method doesn't expect any request body.
   */
  addStreak$Response(params: AddStreak$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addStreak(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addStreak$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addStreak(params: AddStreak$Params, context?: HttpContext): Observable<void> {
    return this.addStreak$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getStreak()` */
  static readonly GetStreakPath = '/streak/get-streak';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStreak()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStreak$Response(params: GetStreak$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getStreak(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStreak$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStreak(params: GetStreak$Params, context?: HttpContext): Observable<number> {
    return this.getStreak$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getDailyStreak()` */
  static readonly GetDailyStreakPath = '/streak/daily-streak';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDailyStreak()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDailyStreak$Response(params: GetDailyStreak$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getDailyStreak(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDailyStreak$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDailyStreak(params: GetDailyStreak$Params, context?: HttpContext): Observable<number> {
    return this.getDailyStreak$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
