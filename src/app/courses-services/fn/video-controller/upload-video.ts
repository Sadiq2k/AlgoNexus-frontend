/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Video } from '../../models/video';

export interface UploadVideo$Params {
  [x: string]: any;
  title: string;
  description: string;
  file: File;
  courseId:any
}

export function uploadVideo(http: HttpClient, rootUrl: string, params: UploadVideo$Params, context?: HttpContext): Observable<StrictHttpResponse<Video>> {
  const rb = new RequestBuilder(rootUrl, uploadVideo.PATH, 'post');
  
  const formData = new FormData();
  formData.append('title', params.title);
  formData.append('description', params.description);
  formData.append('file',params.file);
  formData.append('courseId', params.courseId);

  const headers = new HttpHeaders();
  headers.append('Accept', '*/*');

  return http.post(rootUrl + uploadVideo.PATH, formData, {
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

uploadVideo.PATH = '/videos/add';
