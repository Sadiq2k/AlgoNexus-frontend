/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addProblemTestCases } from '../fn/test-case-controller/add-problem-test-cases';
import { AddProblemTestCases$Params } from '../fn/test-case-controller/add-problem-test-cases';
import { getProblemTestCases } from '../fn/test-case-controller/get-problem-test-cases';
import { GetProblemTestCases$Params } from '../fn/test-case-controller/get-problem-test-cases';
import { runAndTestSolution } from '../fn/test-case-controller/run-and-test-solution';
import { RunAndTestSolution$Params } from '../fn/test-case-controller/run-and-test-solution';
import { TestCaseDto } from '../models/test-case-dto';
import { TestCaseRunResponse } from '../models/test-case-run-response';

@Injectable({ providedIn: 'root' })
export class TestCaseControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `runAndTestSolution()` */
  static readonly RunAndTestSolutionPath = '/test-case/run-and-test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `runAndTestSolution()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  runAndTestSolution$Response(params: RunAndTestSolution$Params, context?: HttpContext): Observable<StrictHttpResponse<TestCaseRunResponse>> {
    return runAndTestSolution(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `runAndTestSolution$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  runAndTestSolution(params: RunAndTestSolution$Params, context?: HttpContext): Observable<TestCaseRunResponse> {
    return this.runAndTestSolution$Response(params, context).pipe(
      map((r: StrictHttpResponse<TestCaseRunResponse>): TestCaseRunResponse => r.body)
    );
  }

  /** Path part for operation `addProblemTestCases()` */
  static readonly AddProblemTestCasesPath = '/test-case/add-testcase';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProblemTestCases()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProblemTestCases$Response(params: AddProblemTestCases$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return addProblemTestCases(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addProblemTestCases$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProblemTestCases(params: AddProblemTestCases$Params, context?: HttpContext): Observable<string> {
    return this.addProblemTestCases$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getProblemTestCases()` */
  static readonly GetProblemTestCasesPath = '/test-case/get-problem-testcases/{problemId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProblemTestCases()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTestCases$Response(params: GetProblemTestCases$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TestCaseDto>>> {
    return getProblemTestCases(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProblemTestCases$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProblemTestCases(params: GetProblemTestCases$Params, context?: HttpContext): Observable<Array<TestCaseDto>> {
    return this.getProblemTestCases$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TestCaseDto>>): Array<TestCaseDto> => r.body)
    );
  }

}
