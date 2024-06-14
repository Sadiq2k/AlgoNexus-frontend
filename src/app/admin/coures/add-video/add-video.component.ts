import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseControllerService, VideoControllerService } from '../../../courses-services/services';
import { UpdateVideo$Params } from '../../../courses-services/fn/video-controller/update-video';
import { UploadVideo$Params } from '../../../courses-services/fn/video-controller/upload-video';
import { ActivatedRoute, Router } from '@angular/router';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrl: './add-video.component.scss'
})
export class AddVideoComponent implements OnInit {

  videoForm: FormGroup;
  selectedFile: File | null = null;
  selectedFileError: string | null = null;
  courseId!: number;
  loading: boolean = false;


  constructor(private fb: FormBuilder,
    private videoService: VideoControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.videoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      console.log(this.courseId);
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const maxSize = 100 * 1024 * 1024;
      if (file.size > maxSize) {
        this.selectedFileError = 'File size exceeds the maximum limit of 100MB.';
        console.log(this.selectedFileError)
        this.selectedFile = null;
      } else {
        this.selectedFile = file;
        this.selectedFileError = null; // Reset error message
        console.log('this is oke')
      }
    } else {
      this.selectedFile = null;
      this.selectedFileError = 'Please select a video file.';
    }
  }

  onSubmit(): void {
    this.loading = true;
    if (this.videoForm.valid && this.selectedFile) {

      const formData: UploadVideo$Params = {
        title: this.videoForm.get('title')?.value,
        description: this.videoForm.get('description')?.value,
        file: this.selectedFile,
        courseId: this.courseId
      };
      this.videoService.uploadVideo(formData).subscribe({
        next: (res) => {
          this.loading = false;
          console.log(res)
          this.router.navigate(['/admin/courses/course-videos', { courseId: this.courseId }])

        }, error: (err) => {
          this.loading = false
          if (err.status == 200) {
            console.log("successfully added")
            this.router.navigate(['/admin/courses/course-videos', { courseId: this.courseId }])
          } else if (err.status == 0) {
            this.loading = false
          }
          console.log("error occure uploading the video", err)
          
        }
      })
    }
  }
}
