import { Component, Input, OnInit } from '@angular/core';
import { VideoService } from '../service/video.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoControllerService } from '../../../courses-services/services';
import { UploadVideo$Params } from '../../../courses-services/fn/video-controller/upload-video';
import { UpdateVideo$Params } from '../../../courses-services/fn/video-controller/update-video';

@Component({
  selector: 'app-video-edit-model',
  templateUrl: './video-edit-model.component.html',
  styleUrl: './video-edit-model.component.scss'
})
export class VideoEditModelComponent implements OnInit {


  video: any;
  videoForm: FormGroup;
  selectedFile: File | null = null;
  selectedFileError: string | null = null;
  courseId!: number;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private videoService: VideoControllerService,
    private route: ActivatedRoute,
    private router: Router,
    private localVideoService: VideoService
  ) {
    this.videoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
    });
    this.video = this.localVideoService.getVideos();
    console.log(this.video)
    this.videoForm.patchValue({
      title: this.video.title,
      description: this.video.description
    });
  }

  clearVideo() {
    this.video.title = '';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const maxSize = 100 * 1024 * 1024;
      if (file.size > maxSize) {
        this.selectedFileError = 'File size exceeds the maximum limit of 100MB.';
        this.selectedFile = null;
      } else {
        this.selectedFile = file;
        this.selectedFileError = null; // Reset error message
      }
    } else {
      this.selectedFile = null;
      this.selectedFileError = 'Please select a video file.';
    }
  }

  onSubmit(): void {
    this.loading = true;
    if (this.videoForm.valid) {
      const formData: UpdateVideo$Params = {
        title: this.videoForm.get('title')?.value,
        description: this.videoForm.get('description')?.value,
        videoId: this.video.id
      };

      if (this.selectedFile) {
        formData.file = this.selectedFile;
      }
      // console.log('Form Data:', formData);
      this.videoService.updateVideo(formData).subscribe({
        next: (res) => {
          this.loading = false;
          this.router.navigateByUrl('/admin/courses/add').then(() => {
            this.router.navigate(['/admin/courses/course-videos', { courseId: this.courseId }])
          })
        }, error: (err) => {
          this.loading = false
          if (err.status == 200) {
            console.log("successfully added")
            this.router.navigate(['/admin/courses/course-videos', { courseId: this.courseId }])
          }
          console.log("error occure uploading the video", err)
        }
      })
    } else {
      this.selectedFileError = this.selectedFile ? null : 'Please select a video file.';
    }
  }
}
