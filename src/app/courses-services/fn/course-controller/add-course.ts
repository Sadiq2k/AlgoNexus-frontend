/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AddCourse$Params {
  topicName: string;
  description: string;

  file: File;

}

export function addCourse(http: HttpClient, rootUrl: string, params: AddCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, addCourse.PATH, 'post');
  const formData = new FormData();
  formData.append('topicName', params.topicName);
  formData.append('description', params.description);
  formData.append('file',params.file)

  const headers = new HttpHeaders();
  headers.append('Accept', '*/*');

  return http.post(rootUrl + addCourse.PATH, formData, {
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

addCourse.PATH = '/courses/add';
