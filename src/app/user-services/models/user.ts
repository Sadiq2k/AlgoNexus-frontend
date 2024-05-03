/* tslint:disable */
/* eslint-disable */
import { UserProfileImage } from '../models/user-profile-image';
export interface User {
  dateOfBirth?: string;
  education?: string;
  email?: string;
  firstname?: string;
  gender?: string;
  github?: string;
  id?: string;
  lastname?: string;
  linkedin?: string;
  location?: string;
  profileImage?: UserProfileImage;
  work?: string;
}
