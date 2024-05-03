/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FullNameRequest } from '../../models/full-name-request';
import { UpdateFullNameResponse } from '../../models/update-full-name-response';

export interface SetFullName$Params {
      body: FullNameRequest
}

export function setFullName(http: HttpClient, rootUrl: string, params: SetFullName$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateFullNameResponse>> {
  const rb = new RequestBuilder(rootUrl, setFullName.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UpdateFullNameResponse>;
    })
  );
}

setFullName.PATH = '/users/updateName';
