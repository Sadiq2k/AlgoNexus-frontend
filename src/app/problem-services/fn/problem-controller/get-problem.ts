/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Problem } from '../../models/problem';

export interface GetProblem$Params {
  problemId: string;
}

export function getProblem(http: HttpClient, rootUrl: string, params: GetProblem$Params, context?: HttpContext): Observable<StrictHttpResponse<Problem>> {
  const rb = new RequestBuilder(rootUrl, getProblem.PATH, 'get');
  if (params) {
    rb.path('problemId', params.problemId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Problem>;
    })
  );
}

getProblem.PATH = '/problem/{problemId}';
