import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataShareService } from '../../../dataShare/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.scss'
})
export class AddQuestionComponent implements OnInit{

  problemForm!: FormGroup;
  @Output() formData = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
    private shareData:DataShareService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.problemForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      difficulty: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
   // Custom validation messages
   get title() { return this.problemForm.get('title'); }
   get category() { return this.problemForm.get('category'); }
   get difficulty() { return this.problemForm.get('difficulty'); }
   get description() { return this.problemForm.get('description'); }

  onSubmit() {
    this.problemForm.markAllAsTouched();
    
    if (this.problemForm.invalid) {
      // this.errorMessage = 'Please fill out all required fields.';
      return;
    } 
    if (this.problemForm.valid) {
      console.log('Form submitted:', this.problemForm.value);
      // Here you can perform further actions like sending the data to your backend
      const formData = this.problemForm.value;
      this.shareData.sendFormDataQuestion(formData);
     this.router.navigate(['/admin/problems/solution'])
    } else {
      // Handle form validation errors
      console.log('Form invalid');
    }
  }
}
