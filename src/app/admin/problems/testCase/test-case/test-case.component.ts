import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataShareService } from '../../../../dataShare/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrl: './test-case.component.scss'
})
export class TestCaseComponent {

  constrainsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private shareDataService: DataShareService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.constrainsForm = this.formBuilder.group({
      constraints: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.constrainsForm.markAllAsTouched();

    if (this.constrainsForm.valid) {
      const constraintsData = this.constrainsForm.value;
      const constraintsArray = constraintsData.constraints.split('\n').map((constraint: string) => constraint.trim());
      constraintsData.constraints = constraintsArray;
      console.log("Constraints Data:", constraintsData);
      this.shareDataService.sendFormDataTestCase(constraintsData);
    }
  }


}
