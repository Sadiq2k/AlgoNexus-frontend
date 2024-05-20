/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Problem } from '../../models/problem';

export interface GetAllProblems$Params {
}

export function getAllProblems(http: HttpClient, rootUrl: string, params?: GetAllProblems$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Problem>>> {
  const rb = new RequestBuilder(rootUrl, getAllProblems.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Problem>>;
    })
  );
}

getAllProblems.PATH = '/problem';
