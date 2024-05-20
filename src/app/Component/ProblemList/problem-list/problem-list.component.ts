import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemControllerService } from '../../../problem-services/services';
import { ProblemService } from '../../../problemService/problem.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrl: './problem-list.component.scss'
})
export class ProblemListComponent {


  constructor(private router:Router,
    private problemControllerService: ProblemControllerService,
    private problemService:ProblemService
  
  ){}
 

 
allProblem:any

  ngOnInit(): void {
    this.problemControllerService.getAllProblems().subscribe({
      next:(res)=>{
        console.log("all problems ",res);
        this.allProblem = res;
      },error:(err)=>{
        console.log("error occur ",err);
      }
    })
  }


  goToProblemDetails(ProblemId: any) {
   console.log(ProblemId)
    this.router.navigate(['user-coding', { problemId: ProblemId }]);
}

}
