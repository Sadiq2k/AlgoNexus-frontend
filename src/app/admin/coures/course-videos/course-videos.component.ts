import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoControllerService } from '../../../courses-services/services';
import { GetVideos$Params } from '../../../courses-services/fn/video-controller/get-videos';
import { VideoResponse } from '../../../courses-services/models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from '../service/video.service';
import { error } from 'node:console';
import { DeleteVideo$Params } from '../../../courses-services/fn/video-controller/delete-video';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-videos',
  templateUrl: './course-videos.component.html',
  styleUrl: './course-videos.component.scss'
})
export class CourseVideosComponent implements OnInit {

  courseId!: number;
  showCourses: boolean = true;
  allVideos!: VideoResponse[];
  topicName:string =''

  constructor(private route: ActivatedRoute,
    private router: Router,
    private videoService: VideoControllerService,
    private sanitizer: DomSanitizer,
    private LocalVideoService: VideoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.topicName = params['topicName'];
    });
    this.getCourseVideos(this.courseId);
  }

  sanitizeUrl(url: string | undefined): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url ?? ''); // Use nullish coalescing operator
  }
  showCoursesList() {
    this.showCourses = true;
  }

  overView() {
    this.showCourses = false;
  }

  addVideo() {
    this.router.navigate(['/admin/courses/course-videos/add', { courseId: this.courseId }])
  }

  totalVideo:number =0
  getCourseVideos(courseID: number) {

    const id: GetVideos$Params = {
      courseId: courseID
    }

    this.videoService.getVideos(id).subscribe({
      next: (res: VideoResponse[]) => {
        this.allVideos = res;
        this.totalVideo = this.allVideos.length;
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  editVideo(video: any): void {
    this.LocalVideoService.setVideo(video);
    // Redirect to edit page or open a modal, etc.
    this.showEditModal = true;
  }

  showEditModal = false;

  deleteVideo(videoId: number|undefined): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this video?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        const id: DeleteVideo$Params = { id: videoId };
        this.videoService.deleteVideo(id).subscribe({
          next: (res) => {
            Swal.fire(
              'Deleted!',
              'The video has been deleted.',
              'success'
            ).then(() => {
              this.router.navigate(['/admin/courses/course-videos', { courseId: this.courseId }]);
            });
          },
          error: (err) => {
            console.error('Error occurred while deleting the video:', err);
            Swal.fire(
              'Error!',
              'There was a problem deleting the video.',
              'error'
            );
          }
        });
      }
    });
  }

  
  truncateDescription(description: string | undefined): string {
    if (!description) return ''; // Handle undefined or null values
    const words = description.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return description;
  }



}
