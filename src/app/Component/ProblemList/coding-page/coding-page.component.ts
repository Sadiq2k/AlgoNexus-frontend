import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemControllerService } from '../../../problem-services/services';
import { GetProblem$Params } from '../../../problem-services/fn/problem-controller/get-problem';
import { ProblemService } from '../../../problemService/problem.service';
import { MonacoEditorLoaderService, MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';
import { TestCaseControllerService } from '../../../testcase-services/services';
import { timeStamp } from 'console';
import { strict } from 'assert';
import { response } from 'express';
import { UserAuthService } from '../../../auth/user-auth.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coding-page',
  templateUrl: './coding-page.component.html',
  styleUrl: './coding-page.component.scss'
})
export class CodingPageComponent implements AfterViewInit {



  problemId: any;
  testResultbooll: boolean = false
  statusText: any;
  problemVerifiedResponse: any;
  problemSubmissionsResponse: any;
  loading: boolean = false;
  isClicked: boolean = false;
  private errorPrefix: string = 'messageproblemsService.Model.Judge0.error.SandboxCompile';
  isloading: boolean = false;
  statusTextAcceptedOrRejected: string = ''
  pendingLoading: boolean = false;
  acceptedBooll: boolean = false;
  testCaseValue: string = '';

  constructor(private route: ActivatedRoute,
    private problemControleService: ProblemControllerService,
    private problemService: ProblemService,
    private monacoLoaderService: MonacoEditorLoaderService,
    private testCaseControllerService: TestCaseControllerService,
    private el: ElementRef,
    private authService: UserAuthService,
    private datePipe: DatePipe
  ) { }



  editorCode: string = '';
  editorOptions = {
    theme: 'vs-dark', language: 'java'
  };
  @ViewChild('editorContainer') editorContainer!: ElementRef;
  @ViewChild('codeContainer', { static: false }) codeContainer!: ElementRef;


  editorInstance: MonacoStandaloneCodeEditor | undefined;

  ngAfterViewInit() {
    console.log("ngAfterViewInit called");

    this.monacoLoaderService.isMonacoLoaded$.subscribe(isLoaded => {
      if (isLoaded) {
        if (this.editorContainer && this.editorContainer.nativeElement) {
          console.log("Editor container found:", this.editorContainer.nativeElement);
          this.editorInstance = this.editorContainer.nativeElement.editor;
          console.log('Editor instance:', this.editorInstance);
        } else {
          console.log("Editor container not found");
        }
      } else {
        console.log("Monaco editor not loaded");
      }
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.problemId = params['problemId'];
      console.log('Problem ID:', this.problemId);

      if (this.problemId) {
        this.getProblem(this.problemId);
      }
    });

  }
  testCases: any
  problemData: any;
  getProblem(ProblemId: any) {
    this.problemService.getProblem(ProblemId).subscribe({
      next: (res) => {
        this.problemData = res;
        this.testCases = this.problemData.examples;
        this.testCasesAddToArray();
        if (this.problemData.solutionTemplate) {
          this.problemData.solutionTemplate = atob(this.problemData.solutionTemplate);
          this.editorCode = this.problemData.solutionTemplate;
        }
      }, error: (err) => {
        console.log("error thorw getting a problem", err);
      }
    })

  }

  testCasesAddToArray() {
    if (Array.isArray(this.problemData.examples)) {
      this.problemData.examples.forEach((examples: any) => {
        if (typeof examples.testCaseInput === 'string') {
          if (examples.testCaseInput.includes(' ')) {
            examples.testCaseInput = `[ ${examples.testCaseInput.split(' ').join(', ')} ]`;
          }
        }
      });
    }
    if (Array.isArray(this.problemData.examples)) {
      this.problemData.examples.forEach((examples: any) => {
        if (typeof examples.expectedOutput === 'string') {
          if (examples.expectedOutput.includes(' ')) {
            examples.expectedOutput = `[ ${examples.expectedOutput.split(' ').join(', ')} ]`;
          }
        }
      });
    }
  }

  onEditorContentChange(content: string) {
    console.log('Editor content changed:', content);
  }



  getTaseCase(id: any) {
    const cases = this.problemData.testCases;
    for (let i = 0; i < cases.length; i++) {
      let value = cases[i];
      if (value.id === id) {
        this.testCaseValue = value.input.nums;
      }
    }
  }

  runTheCode() {
    this.problemVerifiedResponse = ''
    this.loading = true;
    this.showSubmissionBooll = false;
    // this.statusText = "";
    // this.isClicked = true;
    this.testResultbooll = true;
    this.problemVerifiedResponse = ''
    this.showDescribtionBooll = false;
    this.acceptedBooll = false;
    this.statusText = ''

    if (Array.isArray(this.testCases)) {
      this.testCases.forEach((testCases: any) => {
        if (typeof testCases.testCaseInput === 'string') {
          if (testCases.testCaseInput.includes(' ')) {
            testCases.testCaseInput = testCases.testCaseInput.replace(/[\[\],]/g, '').trim();
          }
        }
      });
    }
    if (Array.isArray(this.testCases)) {
      this.testCases.forEach((testCases: any) => {
        if (typeof testCases.expectedOutput === 'string') {
          if (testCases.expectedOutput.includes(' ')) {
            testCases.testCaseInput = testCases.expectedOutput.replace(/[\[\],]/g, '').trim();
          }
        }
      });
    }

    const userSourceCode = btoa(this.editorCode);


    // Decoding sourceCode
    const decodedDriverCode = atob(this.problemData.driverCode);
    const res = this.editorCode + decodedDriverCode;

    const DriverCodePlusUserSourceCode: any = btoa(res);
    console.log("Decoded Source Code:", this.testCases);

    const requestBody = {
      sourceCode: DriverCodePlusUserSourceCode,
      languageId: this.problemData.languageId,
      testCases: this.testCases
    };


    this.problemControleService.verifyProblem({ body: requestBody }).subscribe({
      next: (response) => {

        this.problemVerifiedResponse = response;
        console.log("=========", this.problemVerifiedResponse);
        this.loading = false;
        this.testResultbooll = true;
        this.testCasesAddToArray();

      }, error: (err) => {
        console.log("error occure to the conding page component run the solution", err)
        if (err.error) {
          this.statusText = err.error.message;
          console.log(" message", this.statusText);
          this.loading = false;
        } else {
          this.statusText = err.statusText
        }
      }
    })
  }

  showTestResult() {
    this.testResultbooll = true;
    this.isClicked = true;
    this.showDescribtionBooll = false
    this.showSubmissionBooll = false
    this.acceptedBooll = false;
  }

  disabledTestResult() {
    this.showSubmissionBooll = false
    this.testResultbooll = false;
    this.showDescribtionBooll = true
    this.problemVerifiedResponse = null;
    this.statusText = ''
  }
  disabledAcceptedButton() {
    this.acceptedBooll = false
    this.showDescribtionBooll = true;

  }

  showDescribtionBooll: boolean = true;
  showDescribtion() {
    this.testResultbooll = false;
    this.showDescribtionBooll = true;
    this.isClicked = false;
    this.showSubmissionBooll = false

  }


  submitProblem() {
    this.isloading = true
    this.problemSubmissionsResponse = '';
    this.acceptedBooll = false;
    this.problemVerifiedResponse = '';


    const userId = this.authService.getUserId() as string;
    if (!userId) {
      Swal.fire({
        text: 'PLEASE REGISTER THE ACCOUNT'
      }).then(() => {
        this.isloading = false;
        return;
      });
      return;
    }
    setTimeout(() => {
      this.isloading = false;
      this.pendingLoading = true;
    }, 3000)

    let language = '';
    this.loading = true;
    this.statusText = "";
    this.isClicked = false;

    if (this.problemData.languageId === 62) {
      language = "Java"
    } else {
      language = "JavaScript"
    }
    const userSourceCode = btoa(this.editorCode);

    const requestbody = {
      driverCode: this.problemData.driverCode,
      language: language,
      languageId: this.problemData.languageId,
      problemId: this.problemData.problemId,
      solutionCode: userSourceCode,
      userId: this.authService.getUserId() as string,
      difficulty: this.problemData.difficulty,
      problemNo: this.problemData.problemNo,
      title: this.problemData.title
    }

    this.testCaseControllerService.runAndTestSolution({ body: requestbody }).subscribe({
      next: (response) => {

        this.problemSubmissionsResponse = response
        this.problemSubmissionsResponse.sourceCode = atob(this.problemSubmissionsResponse.sourceCode)
        this.loading = false;
        this.acceptedBooll = true;
        this.isloading = false;
        this.pendingLoading = false;
        this.showDescribtionBooll = false;
        this.testResultbooll = false;
        this.problemSubmissionsResponse.submissionTime = this.datePipe.transform(
          this.problemSubmissionsResponse.submissionTime, 'MMMM d, yyyy HH:mm') || '';
        this.showSubmisstion()
      }, error: (err) => {
        console.log(err);
        this.pendingLoading = false;
        this.loading = false;

        if (err.error) {
          this.testResultbooll = true;
          this.showDescribtionBooll = false;
          this.loading = false;
          this.statusText = err.error.message
          console.log(" message", this.statusText);
        } else {
          this.statusText = err.statusText
        }
      }
    })

  }
  allSubmission: any;
  showSubmissionBooll: boolean = false
  showSubmisstion() {
    this.testResultbooll = false;
    this.showDescribtionBooll = false;
    this.showSubmissionBooll = true;
    this.acceptedBooll = false;
    
    if(this.problemData.submissionDTO){
      this.allSubmission = this.problemData.submissionDTO.reverse();
    }
    
  }



}
