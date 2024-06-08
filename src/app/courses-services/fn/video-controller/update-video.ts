/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Video } from '../../models/video';

export interface UpdateVideo$Params {
  title: string;
  description: string;
  videoId: any;

 file?: File
}

export function updateVideo(http: HttpClient, rootUrl: string, params: UpdateVideo$Params, context?: HttpContext): Observable<StrictHttpResponse<Video>> {
  const rb = new RequestBuilder(rootUrl, updateVideo.PATH, 'post');
  const formData = new FormData();
  formData.append('title', params.title);
  formData.append('description', params.description);
  if (params.file) {
    formData.append('file', params.file); // Append file only if it is provided
  }
  formData.append('videoId', params.videoId);
  const headers = new HttpHeaders();
  headers.append('Accept', '*/*');

  return http.post(rootUrl + updateVideo.PATH, formData, {
      headers: headers,
      observe: 'response',
      responseType: 'json',
      context: context
  }).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Video>;
    })
  );
}

updateVideo.PATH = '/videos/update';
