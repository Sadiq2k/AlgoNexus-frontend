/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TestCaseDto } from '../../models/test-case-dto';

export interface GetProblemTestCases$Params {
  problemId: string;
}

export function getProblemTestCases(http: HttpClient, rootUrl: string, params: GetProblemTestCases$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TestCaseDto>>> {
  const rb = new RequestBuilder(rootUrl, getProblemTestCases.PATH, 'get');
  if (params) {
    rb.path('problemId', params.problemId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TestCaseDto>>;
    })
  );
}

getProblemTestCases.PATH = '/test-case/get-problem-testcases/{problemId}';
