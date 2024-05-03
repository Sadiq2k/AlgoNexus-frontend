/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UploadImage$Params {
  userId: string;
  image: File;
}

export function uploadImage(http: HttpClient, rootUrl: string, params: UploadImage$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const formData = new FormData();
  formData.append('userId', params.userId);
  formData.append('image', params.image);

  const headers = new HttpHeaders();
  headers.append('Accept', '*/*');

  return http.post(rootUrl + uploadImage.PATH, formData, {
      headers: headers,
      observe: 'response',
      responseType: 'json',
      context: context
  }).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<any>;
      })
  );
}

uploadImage.PATH = '/cloudinary';
