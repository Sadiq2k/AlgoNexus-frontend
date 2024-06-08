import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataShareService } from '../../../dataShare/data-share.service';
import { Router } from '@angular/router';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProblemService } from '../../../problemService/problem.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.scss'
})
export class AddQuestionComponent implements OnInit{
 
  showDialog: boolean = false;
  problemForm!: FormGroup;
  showAddCategoryDialog: boolean = false;
  allCategories: any;
  difficulties!: any;
  errMessage!:string;

  constructor(private formBuilder: FormBuilder,
    private shareData:DataShareService,
    private router:Router,
    private dialog: MatDialog,
    private problemService:ProblemService
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.initForm();

  }

  getAllCategory(){
   this.problemService.getAllCategory().subscribe({
      next:(res)=>{
        console.log(res)
        this.allCategories = res.categories;
        this.difficulties = res.difficulties;
        console.log(this.difficulties)
        console.log(this.allCategories)
      }
    })
   
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
      const formData = this.problemForm.value;
      this.problemService.checkExistsTitleOrNot(formData.title).subscribe({
        next:(res)=>{
          this.shareData.sendFormDataQuestion(formData);
          this.router.navigate(['/admin/problems/solution'])
        },error:(err)=>{
          if(err.status == 409){
            this.errMessage = err.error;
          }
        }
      })
      
    } else {
      console.log('Form invalid');
    }
  }

  openAddCategoryDialog() {
    this.showDialog = true;
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/add-question'])
      this.showDialog = false;
      console.log('The dialog was closed');
      
    });
  }
}
