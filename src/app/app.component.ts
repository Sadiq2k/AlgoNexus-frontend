import { Component, OnInit } from '@angular/core';
import { DataShareService } from './dataShare/data-share.service';
import { ProblemService } from './problemService/problem.service';
import { ProblemControllerService } from './problem-services/services';
import { AddProblemRequest } from './problem-services/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'AlgoNexus-Frontend';

  editorOptions = { theme: 'vs-dark', language: 'java' };
  code: string = 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}';
  originalCode: string = 'public class Main { // TODO }';

    constructor(private shareDataService:DataShareService,
      private problemService:ProblemService,
      private problemControllerService:ProblemControllerService,
      private toastr: ToastrService
    ){}
    
    receivedData: any;
    receivedDataSolution:any
    receivedDataExplanation:any
    receivedDataTestCase:any
    receivedDataConstraints:any

    ngOnInit(): void {
      this.shareDataService.formData$.subscribe(formData => {
        this.receivedData = formData;
        console.log('Received form data in parent component:', this.receivedData);
      });

      this.shareDataService.formDataSolution$.subscribe(formDataSolution =>{
        this.receivedDataSolution = formDataSolution;
        console.log("receive data solution:=> ",this.receivedDataSolution);
      
      });

      this.shareDataService.formDataExplanation$.subscribe(formDataExplanation =>{
       
        this.receivedDataExplanation = formDataExplanation;
        console.log("receive data explanation ",this.receivedDataExplanation);
      });
      this.shareDataService.formDataTestCase$.subscribe(formDataTestCase =>{
        this.receivedDataTestCase = formDataTestCase
        console.log("receive data testCase ",this.receivedDataTestCase);

        this.shareDataService.formDataConstraints$.subscribe(formDataConstraints =>{
            this.receivedDataConstraints = formDataConstraints;
        });

        if(this.receivedDataTestCase){
          this.addProblem();
        }
    });
  
}

addProblem() {

  const dataToSend: AddProblemRequest = {
    title: this.receivedData?.title,
    description: this.receivedData?.description,
    category : this.receivedData?.category,
    difficulty: this.receivedData?.difficulty,
    solutionTemplate: this.receivedDataSolution?.solutionTempete,
     languageId:  this.receivedDataSolution?.data?.state?.data?.languageId,
     driverCode:  this.receivedDataSolution?.data?.state?.data?.sourceCode,
    examples: this.receivedDataExplanation,
    testCases: this.receivedDataSolution?.data?.state?.data?.testCases,
    constraints: this.receivedDataTestCase && this.receivedDataTestCase.constraints ? this.receivedDataTestCase.constraints : [],
 
    
   
  };
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>",dataToSend);
  this.problemControllerService.addProblem({body :dataToSend}).subscribe({
    next: (response) => {
      console.log('Problem added successfully:', response);
      this.receivedData = null;
      this.receivedDataSolution = null;
      this.receivedDataExplanation = null;
      this.receivedDataTestCase = null;
      this.toastr.success('Problem added successfully');
    },
    error: (error) => {
      if (error.status === 200) {
        console.log('Problem added successfully:');
        this.toastr.success('Problem added successfully');
      return;
      }
      console.error('Error adding problem:', error);
    }
  });
}  
}