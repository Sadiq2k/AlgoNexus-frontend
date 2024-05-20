/* tslint:disable */
/* eslint-disable */
import { Example } from '../models/example';
import { TestCase } from '../models/test-case';
export interface Problem {
  acceptanceRate?: number;
  category?: string;
  constraints?: Array<string>;
  createdAt?: string;
  description?: string;
  difficulty?: string;
  driverCode?: string;
  examples?: Array<Example>;
  id?: string;
  languageId?: number;
  solutionTemplate?: string;
  testCases?: Array<TestCase>;
  title?: string;
}
