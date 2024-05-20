/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProblemVerificationRequest } from '../../models/problem-verification-request';
import { ProblemVerificationResponse } from '../../models/problem-verification-response';

export interface VerifyProblem$Params {
      body: ProblemVerificationRequest
}

export function verifyProblem(http: HttpClient, rootUrl: string, params: VerifyProblem$Params, context?: HttpContext): Observable<StrictHttpResponse<ProblemVerificationResponse>> {
  const rb = new RequestBuilder(rootUrl, verifyProblem.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ProblemVerificationResponse>;
    })
  );
}

verifyProblem.PATH = '/problem/verify-problem';
