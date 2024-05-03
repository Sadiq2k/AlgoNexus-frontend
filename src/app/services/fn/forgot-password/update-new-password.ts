/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdatePasswordRequest } from '../../models/update-password-request';
import { UpdatePasswordResponse } from '../../models/update-password-response';

export interface UpdateNewPassword$Params {
      body: UpdatePasswordRequest
}

export function updateNewPassword(http: HttpClient, rootUrl: string, params: UpdateNewPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdatePasswordResponse>> {
  const rb = new RequestBuilder(rootUrl, updateNewPassword.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UpdatePasswordResponse>;
    })
  );
}

updateNewPassword.PATH = '/password/update';
