/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ForgotPasswordRequest } from '../../models/forgot-password-request';
import { ForgotPasswordResponse } from '../../models/forgot-password-response';

export interface ForgotPassword$Params {
      body: ForgotPasswordRequest
}

export function forgotPassword(http: HttpClient, rootUrl: string, params: ForgotPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<ForgotPasswordResponse>> {
  const rb = new RequestBuilder(rootUrl, forgotPassword.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ForgotPasswordResponse>;
    })
  );
}

forgotPassword.PATH = '/auth/forgot';
