/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteVideo } from '../fn/video-controller/delete-video';
import { DeleteVideo$Params } from '../fn/video-controller/delete-video';
import { getVideos } from '../fn/video-controller/get-videos';
import { GetVideos$Params } from '../fn/video-controller/get-videos';
import { updateVideo } from '../fn/video-controller/update-video';
import { UpdateVideo$Params } from '../fn/video-controller/update-video';
import { uploadVideo } from '../fn/video-controller/upload-video';
import { UploadVideo$Params } from '../fn/video-controller/upload-video';
import { Video } from '../models/video';
import { VideoResponse } from '../models/video-response';

@Injectable({ providedIn: 'root' })
export class VideoControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateVideo()` */
  static readonly UpdateVideoPath = '/videos/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateVideo()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateVideo$Response(params: UpdateVideo$Params, context?: HttpContext): Observable<StrictHttpResponse<Video>> {
    return updateVideo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateVideo$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateVideo(params: UpdateVideo$Params, context?: HttpContext): Observable<Video> {
    return this.updateVideo$Response(params, context).pipe(
      map((r: StrictHttpResponse<Video>): Video => r.body)
    );
  }

  /** Path part for operation `uploadVideo()` */
  static readonly UploadVideoPath = '/videos/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadVideo()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadVideo$Response(params: UploadVideo$Params, context?: HttpContext): Observable<StrictHttpResponse<Video>> {
    return uploadVideo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadVideo$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadVideo(params: UploadVideo$Params, context?: HttpContext): Observable<Video> {
    return this.uploadVideo$Response(params, context).pipe(
      map((r: StrictHttpResponse<Video>): Video => r.body)
    );
  }

  /** Path part for operation `getVideos()` */
  static readonly GetVideosPath = '/videos/get-videos';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVideos()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVideos$Response(params: GetVideos$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<VideoResponse>>> {
    return getVideos(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getVideos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVideos(params: GetVideos$Params, context?: HttpContext): Observable<Array<VideoResponse>> {
    return this.getVideos$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<VideoResponse>>): Array<VideoResponse> => r.body)
    );
  }

  /** Path part for operation `deleteVideo()` */
  static readonly DeleteVideoPath = '/videos/video';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteVideo()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteVideo$Response(params?: DeleteVideo$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteVideo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteVideo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteVideo(params?: DeleteVideo$Params, context?: HttpContext): Observable<void> {
    return this.deleteVideo$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
