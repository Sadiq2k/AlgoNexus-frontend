/* tslint:disable */
/* eslint-disable */
import { AcceptCase } from '../models/accept-case';
import { RejectCase } from '../models/reject-case';
export interface TestCaseRunResponse {
  acceptCases?: Array<AcceptCase>;
  averageMemory?: number;
  averageTime?: number;
  rejectCases?: Array<RejectCase>;
  submission?: 'ACCEPTED' | 'REJECTED' | 'ERROR';
  totalTestCases?: number;
}
