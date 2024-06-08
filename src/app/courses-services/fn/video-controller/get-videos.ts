/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { VideoResponse } from '../../models/video-response';

export interface GetVideos$Params {
  courseId: number;
}

export function getVideos(http: HttpClient, rootUrl: string, params: GetVideos$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<VideoResponse>>> {
  const rb = new RequestBuilder(rootUrl, getVideos.PATH, 'get');
  if (params) {
    rb.query('courseId', params.courseId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<VideoResponse>>;
    })
  );
}

getVideos.PATH = '/videos/get-videos';
