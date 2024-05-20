/* tslint:disable */
/* eslint-disable */
import { AcceptCase } from '../models/accept-case';
import { RejectCase } from '../models/reject-case';
export interface ProblemVerificationResponse {
  acceptedCases?: Array<AcceptCase>;
  message?: string;
  rejectedCases?: Array<RejectCase>;
  status?: string;
}
