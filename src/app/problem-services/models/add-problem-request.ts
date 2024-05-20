/* tslint:disable */
/* eslint-disable */
import { Example } from '../models/example';
import { TestCase } from '../models/test-case';
export interface AddProblemRequest {
  category?: string;
  constraints?: Array<string>;
  description?: string;
  difficulty?: string;
  driverCode?: string;
  examples?: Array<Example>;
  languageId?: number;
  solutionTemplate?: string;
  testCases?: Array<TestCase>;
  title?: string;
}
