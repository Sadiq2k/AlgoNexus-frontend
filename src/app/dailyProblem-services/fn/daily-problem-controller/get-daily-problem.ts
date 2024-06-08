/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DatePipe } from '@angular/common';
import { DailyProblemResponse } from '../../models';

export interface GetDailyProblem$Params {
  date: Date;
}

export function getDailyProblem(http: HttpClient, rootUrl: string, params: GetDailyProblem$Params, context?: HttpContext): Observable<StrictHttpResponse<DailyProblemResponse>> {
  const rb = new RequestBuilder(rootUrl, getDailyProblem.PATH, 'get');
  const datePipe = new DatePipe('en-US');
  if (params) {
    const formattedDate = datePipe.transform(params.date, 'yyyy-MM-dd');
    console.log(formattedDate)
    rb.query('date', formattedDate, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DailyProblemResponse>;
    })
  );
}

getDailyProblem.PATH = '/daily-problem/get';


