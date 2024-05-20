/* tslint:disable */
/* eslint-disable */
import { TestCase } from '../models/test-case';
export interface AddTestCaseRequest {
  problemId?: string;
  testCases?: Array<TestCase>;
}
