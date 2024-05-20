/* tslint:disable */
/* eslint-disable */
import { TestCase } from '../models/test-case';
export interface ProblemVerificationRequest {
  languageId: number;
  sourceCode: string;
  testCases: TestCase[];
}
