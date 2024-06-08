/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addCourse } from '../fn/course-controller/add-course';
import { AddCourse$Params } from '../fn/course-controller/add-course';
import { AddCourseResponse } from '../models/add-course-response';
import { deleteTopic } from '../fn/course-controller/delete-topic';
import { DeleteTopic$Params } from '../fn/course-controller/delete-topic';
import { getAllCourseTopic } from '../fn/course-controller/get-all-course-topic';
import { GetAllCourseTopic$Params } from '../fn/course-controller/get-all-course-topic';
import { updateCourse } from '../fn/course-controller/update-course';
import { UpdateCourse$Params } from '../fn/course-controller/update-course';

@Injectable({ providedIn: 'root' })
export class CourseControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateCourse()` */
  static readonly UpdateCoursePath = '/courses/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCourse()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCourse$Response(params: UpdateCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return updateCourse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCourse$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCourse(params: UpdateCourse$Params, context?: HttpContext): Observable<string> {
    return this.updateCourse$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `addCourse()` */
  static readonly AddCoursePath = '/courses/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCourse()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCourse$Response(params: AddCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return addCourse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addCourse$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCourse(params: AddCourse$Params, context?: HttpContext): Observable<string> {
    return this.addCourse$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getAllCourseTopic()` */
  static readonly GetAllCourseTopicPath = '/courses/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCourseTopic()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCourseTopic$Response(params?: GetAllCourseTopic$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AddCourseResponse>>> {
    return getAllCourseTopic(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCourseTopic$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCourseTopic(params?: GetAllCourseTopic$Params, context?: HttpContext): Observable<Array<AddCourseResponse>> {
    return this.getAllCourseTopic$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AddCourseResponse>>): Array<AddCourseResponse> => r.body)
    );
  }

  /** Path part for operation `deleteTopic()` */
  static readonly DeleteTopicPath = '/courses/delete/{courseId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTopic()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTopic$Response(params: DeleteTopic$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteTopic(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTopic$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTopic(params: DeleteTopic$Params, context?: HttpContext): Observable<void> {
    return this.deleteTopic$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
