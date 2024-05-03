/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserProfileImage } from '../../models/user-profile-image';

export interface GetImageByUserId$Params {
  userId: string;
}

export function getImageByUserId(http: HttpClient, rootUrl: string, params: GetImageByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<UserProfileImage>> {
  const rb = new RequestBuilder(rootUrl, getImageByUserId.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserProfileImage>;
    })
  );
}

getImageByUserId.PATH = '/cloudinary/{userId}';
