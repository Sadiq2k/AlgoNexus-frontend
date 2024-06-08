/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UpdateCourse$Params {
  courseId: any;
  topicName: string;
  description: string;

  file?: File;

}

export function updateCourse(http: HttpClient, rootUrl: string, params: UpdateCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const formData = new FormData();
  formData.append('topicName', params.topicName);
  formData.append('description', params.description);
  if(params.file)formData.append('file',params.file);
  
  formData.append('courseId',params.courseId)

  const headers = new HttpHeaders();
  headers.append('Accept', '*/*');

  return http.post(rootUrl + updateCourse.PATH, formData, {
      headers: headers,
      observe: 'response',
      responseType: 'json',
      context: context
  }).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

updateCourse.PATH = '/courses/update';
