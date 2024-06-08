/* tslint:disable */
/* eslint-disable */
import { Course } from '../models/course';
export interface Video {
  course?: Course;
  description?: string;
  id?: number;
  title?: string;
  videoId?: string;
  videoName?: string;
  videoUrl?: string;
}
