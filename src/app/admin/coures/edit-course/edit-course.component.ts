import { Component } from '@angular/core';
import { UpdateCourse$Params } from '../../../courses-services/fn/course-controller/update-course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseControllerService } from '../../../courses-services/services';
import { ActivatedRoute, Router } from '@angular/router';
import { DataShareService } from '../../../dataShare/data-share.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss'
})
export class EditCourseComponent {

  
  courseForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  loading:boolean = false;
  recivedCourses: any;
  // updateCourseBooll:any

  constructor(private fb: FormBuilder,
    private courseService:CourseControllerService,
    private router:Router,
    private dataSharing:DataShareService,
    private route:ActivatedRoute
  ) {
    this.courseForm = this.fb.group({
      topicName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }


  ngOnInit(): void {
  
    this.dataSharing.formDataCourse$.subscribe(recivedCourse =>{
      this.recivedCourses = recivedCourse;
    })
    console.log(this.recivedCourses)
    if (this.recivedCourses) {
      this.courseForm.patchValue({
        topicName: this.recivedCourses.topicName,
        description: this.recivedCourses.description,
        imageUrl: this.recivedCourses.imageUrl
      });
      if (this.recivedCourses.imageUrl) {
        this.previewUrl = this.recivedCourses.imageUrl;
      }
    }
  }

   openFileInput(): void {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }
  

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
    
  }
input!:File
  onFileSelected(event: any): void {
    this.input = event.target.files[0]
      console.log(this.input)
      this.previewFile(this.input);
  }

  previewFile(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.previewUrl = reader.result;
      
    };
  }

  onSubmit(): void {
    this.loading =true;
   
      const formData: UpdateCourse$Params = {
        topicName: this.courseForm.get('topicName')?.value,
        description: this.courseForm.get('description')?.value,
        file: this.input,
        courseId: this.recivedCourses.courseId
      };
      console.log(formData)
  
      this.courseService.updateCourse(formData).subscribe({
        next: (res) => {
          console.log(res);
          console.log('Successfully added');
          this.router.navigate(['/admin/courses']);
        },
        error: (err) => {
          if (err.status === 202) {
            console.log('Successfully added');
            this.router.navigate(['/admin/courses']);
          } else {
            console.log('Unexpected status:', err.status);
          }
        }
      });
    }
}
