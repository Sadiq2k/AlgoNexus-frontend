import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetVideos$Params } from '../../../courses-services/fn/video-controller/get-videos';
import { VideoResponse } from '../../../courses-services/models';
import { VideoControllerService } from '../../../courses-services/services';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit{
  courseId: any;
  allVideos!: VideoResponse[];
  topicName!:string;

  constructor(private route:ActivatedRoute,
    private videoService:VideoControllerService,
    private sanitizer: DomSanitizer
  ){}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.topicName = params['topicName'];
     
    });
    this.getCourseVideos(this.courseId)
  }

  sanitizeUrl(url: string | undefined): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url ?? ''); // Use nullish coalescing operator
  }

  totalVideo:number =0
  getCourseVideos(courseID: number) {

    const id: GetVideos$Params = {
      courseId: courseID
    }

    this.videoService.getVideos(id).subscribe({
      next: (res: VideoResponse[]) => {
        console.log(res)
        this.allVideos = res;
        
        this.totalVideo = this.allVideos.length;
      }, error: (err) => {
        console.log(err)
      }
    })
  }
 

  showCourses:boolean = false;
  showCoursesList(){
    this.showCourses = true;
  }

  overView(){
    this.showCourses = false;
    
  }
}
