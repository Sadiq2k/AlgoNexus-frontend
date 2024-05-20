import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataShareService } from '../../../dataShare/data-share.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {
  exampleForm!: FormGroup;
  testCases: any[] = [];

constructor(private formBuilder: FormBuilder,
  private router:Router,
  private shareDataService:DataShareService,
  private route: ActivatedRoute
) { }

ngOnInit(): void {
  this.exampleForm = this.formBuilder.group({
    testCaseInput1:['',Validators.required],
    expectedOutput1:['',Validators.required],
    testCaseInput2: ['', Validators.required],
    expectedOutput2:['',Validators.required],
    testCaseInput0: ['', Validators.required],
    expectedOutput0:['',Validators.required],
  });
  this.route.paramMap.subscribe(params => {
    const testCasesParam = params.get('testCases');
    if (testCasesParam) {
       this.testCases = JSON.parse(testCasesParam);
      console.log('Test Cases:', this.testCases);
      this.initializeForm();
    }
   
  });
}
initializeForm(): void {
  // Clear any existing form controls
  for (let i = 0; i < 3; i++) {
    this.exampleForm.addControl(`testCaseInput${i}`, this.formBuilder.control(''));
    this.exampleForm.addControl(`expectedOutput${i}`, this.formBuilder.control(''));
  }

  // Set initial values for each form control
  for (let i = 0; i < Math.min(this.testCases.length, 3); i++) {
    this.exampleForm.get(`testCaseInput${i}`)?.patchValue(this.testCases[i]?.testCaseInput);
    this.exampleForm.get(`expectedOutput${i}`)?.patchValue(this.testCases[i]?.expectedOutput);
  }
}

onSubmit() {
  if (this.exampleForm.valid) {
    const example = this.exampleForm.value;
    console.log('explanation:', example);
    const testData = [];
    for (let i = 0; i < 3; i++) {
      testData.push({
        testCaseInput: example[`testCaseInput${i}`],
        expectedOutput: example[`expectedOutput${i}`]
      });
    }

    console.log('Test data:', testData);
    this.shareDataService.sendFormDataExplanation(testData);

    this.router.navigate(['admin/problems/test-case']);
    // You can now process the example input as needed
  }
}
}
