import { Component, NgZone, OnInit } from '@angular/core';
import { DataShareService } from './dataShare/data-share.service';
import { ProblemControllerService } from './problem-services/services';
import { AddProblemRequest } from './problem-services/models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'AlgoNexus-Frontend';

  editorOptions = { theme: 'vs-dark', language: 'java' };
  code: string = 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}';
  originalCode: string = 'public class Main { // TODO }';

  constructor(private shareDataService: DataShareService,
    private problemControllerService: ProblemControllerService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  receivedData: any;
  receivedDataSolution: any
  receivedDataExplanation: any
  receivedDataTestCase: any
  receivedDataConstraints: any

  ngOnInit(): void {
    this.shareDataService.formData$.subscribe(formData => {
      this.receivedData = formData;
    });

    this.shareDataService.formDataSolution$.subscribe(formDataSolution => {
      this.receivedDataSolution = formDataSolution;
    });

    this.shareDataService.formDataExplanation$.subscribe(formDataExplanation => {
      this.receivedDataExplanation = formDataExplanation;
    });
    this.shareDataService.formDataTestCase$.subscribe(formDataTestCase => {
      this.receivedDataTestCase = formDataTestCase;

      this.shareDataService.formDataConstraints$.subscribe(formDataConstraints => {
        this.receivedDataConstraints = formDataConstraints;
      });

      if (this.receivedDataTestCase) {
        this.addProblem();
      }
    });

  }

  addProblem() {

    const dataToSend: AddProblemRequest = {
      title: this.receivedData?.title,
      description: this.receivedData?.description,
      category: this.receivedData?.category,
      difficulty: this.receivedData?.difficulty,
      solutionTemplate: this.receivedDataSolution?.solutionTempete,
      languageId: this.receivedDataSolution?.data?.state?.data?.languageId,
      driverCode: this.receivedDataSolution?.data?.state?.data?.sourceCode,
      examples: this.receivedDataExplanation,
      testCases: this.receivedDataSolution?.data?.state?.data?.testCases,
      constraints: this.receivedDataTestCase && this.receivedDataTestCase.constraints ? this.receivedDataTestCase.constraints : [],

    };
    this.problemControllerService.addProblem({ body: dataToSend }).subscribe({
      next: (response) => {
        this.receivedData = null;
        this.receivedDataSolution = null;
        this.receivedDataExplanation = null;
        this.receivedDataTestCase = null;
        this.ngZone.run(() => {
          this.router.navigate(['/admin/problems']).then(() => {
            Swal.fire(
              'Successful!',
              'Problem Added Successfully.',
              'success'
            );
          });
        });
      },
      error: (error) => {
        if (error.status === 200) {
          Swal.fire(
            'Successful!',
            'Problem Added Successfull.',
            'success'
          ).then(() => {
            this.router.navigate(['/admin/problems']);
          });
        }
        console.error('Error adding problem:', error);
      }
    });
  }
}