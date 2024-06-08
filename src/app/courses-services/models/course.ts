/* tslint:disable */
/* eslint-disable */
import { Video } from '../models/video';
export interface Course {
  courseId?: number;
  description?: string;
  imageId?: string;
  imageName?: string;
  imageUrl?: string;
  topicName?: string;
  videos?: Array<Video>;
}
