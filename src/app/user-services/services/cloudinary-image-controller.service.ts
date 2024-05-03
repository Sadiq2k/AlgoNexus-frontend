/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getImageByUserId } from '../fn/cloudinary-image-controller/get-image-by-user-id';
import { GetImageByUserId$Params } from '../fn/cloudinary-image-controller/get-image-by-user-id';
import { uploadImage } from '../fn/cloudinary-image-controller/upload-image';
import { UploadImage$Params } from '../fn/cloudinary-image-controller/upload-image';
import { UserProfileImage } from '../models/user-profile-image';

@Injectable({ providedIn: 'root' })
export class CloudinaryImageControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `uploadImage()` */
  static readonly UploadImagePath = '/cloudinary';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadImage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadImage$Response(params: UploadImage$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: {
};
}>> {
    return uploadImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadImage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadImage(params: UploadImage$Params, context?: HttpContext): Observable<{
[key: string]: {
};
}> {
    return this.uploadImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: {
};
}>): {
[key: string]: {
};
} => r.body)
    );
  }

  /** Path part for operation `getImageByUserId()` */
  static readonly GetImageByUserIdPath = '/cloudinary/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImageByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageByUserId$Response(params: GetImageByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<UserProfileImage>> {
    return getImageByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getImageByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageByUserId(params: GetImageByUserId$Params, context?: HttpContext): Observable<UserProfileImage> {
    return this.getImageByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserProfileImage>): UserProfileImage => r.body)
    );
  }

}
