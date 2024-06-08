import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseControllerService } from '../../../courses-services/services';
import { AddCourse$Params } from '../../../courses-services/fn/course-controller/add-course';
import { ActivatedRoute, Router } from '@angular/router';
import { DataShareService } from '../../../dataShare/data-share.service';

@Component({
  selector: 'app-add-coures',
  templateUrl: './add-coures.component.html',
  styleUrl: './add-coures.component.scss'
})
export class AddCouresComponent implements OnInit{

  courseForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  loading:boolean = false;
  recivedCourses: any;
  // updateCourseBooll:any
  errMessage!: string;

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
    // this.route.params.subscribe(params =>{
    //   this.updateCourseBooll = params
    // })
    // this.dataSharing.formDataCourse$.subscribe(recivedCourse =>{
    //   this.recivedCourses = recivedCourse;
    // })
    // console.log(this.recivedCourses)
    // if (this.updateCourseBooll) {
    //   this.courseForm.patchValue({
    //     topicName: this.recivedCourses.topicName,
    //     description: this.recivedCourses.description,
    //     imageUrl: this.recivedCourses.imageUrl
    //   });
    //   if (this.recivedCourses.imageUrl) {
    //     this.previewUrl = this.recivedCourses.imageUrl;
    //   }
    // }
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
   
      const formData: AddCourse$Params = {
        topicName: this.courseForm.get('topicName')?.value,
        description: this.courseForm.get('description')?.value,
        file: this.input
      };
      console.log(formData)
  
      this.courseService.addCourse(formData).subscribe({
        next: (res) => {
          console.log(res);
          
        },
        error: (err) => {
          this.loading = false
          console.log("error occure uploading the topic", err)
          if (err.status == 202) {
            console.log("successfully added")
            this.router.navigate(['/admin/courses'])
          } else if (err.status == 0) {
            this.loading = false
          }else if(err.status == 409){
            this.errMessage = 'Topic name already exists'
            this.loading = false;
          }
        }
      });
    }
  }

