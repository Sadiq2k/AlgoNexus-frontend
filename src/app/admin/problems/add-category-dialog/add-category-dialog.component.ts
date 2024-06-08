import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProblemService } from '../../../problemService/problem.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.scss'
})
export class AddCategoryDialogComponent {

  categoryForm!: FormGroup;
  showDialog: boolean = true;

  constructor(private dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private fb: FormBuilder,
    private problemService: ProblemService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],

    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSaveChanges() {
    const name = this.categoryForm.value
    console.log(name)
    this.problemService.addCategory(this.categoryForm).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
        this.router.navigateByUrl('/admin/problems').then(() => {
          this.router.navigate(['/add-question'])
        })
        this.onCancel()
        
      }, error: (err) => {
        console.log(err)
      }
    })
  }


}
