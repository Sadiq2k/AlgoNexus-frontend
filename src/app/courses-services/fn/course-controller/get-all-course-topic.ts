/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AddCourseResponse } from '../../models/add-course-response';

export interface GetAllCourseTopic$Params {
  page?: number;
  size?: number;
}

export function getAllCourseTopic(http: HttpClient, rootUrl: string, params?: GetAllCourseTopic$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AddCourseResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllCourseTopic.PATH, 'get');
  if (params) {
    rb.query('page', params.page);
    rb.query('size', params.size);
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<AddCourseResponse>>;
    })
  );
}

getAllCourseTopic.PATH = '/courses/get';
