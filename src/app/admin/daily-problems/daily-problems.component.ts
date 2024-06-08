import { Component } from '@angular/core';
import { DailyProblemControllerService } from '../../dailyProblem-services/services';
import { ProblemService } from '../../problemService/problem.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-daily-problems',
  templateUrl: './daily-problems.component.html',
  styleUrl: './daily-problems.component.scss'
})
export class DailyProblemsComponent {

  constructor(private problemService: ProblemService) { }

  page: number = 0;
  size: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  dailyProblemlist!:any

  ngOnInit(): void {

    this.getDailyProblemList(this.page,this.size)
  }

  getDailyProblemList(page:number,size:number) {
    this.problemService.getDailyProblemList(page,size).subscribe({
      next:(res)=>{
        this.dailyProblemlist = res
        this.totalPages = res.totalPages
        this.totalElements = res.totalElements
        this.dailyProblemlist.problemNameDto.forEach((problem: { displayDate: string; date: string; }) => {
          problem.displayDate = this.getDisplayDate(problem.date);
        });
      },error:(err)=>{
        console.log("error occure fetching the daily problem list",err)
      }
    })
  }
  
  getDisplayDate(date: string): string {
    const problemDate = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (problemDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (problemDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return formatDate(problemDate, 'MMMM d, y', 'en-US');
    }
  }

  goToPage(page: number): void {
    this.page = page;
    this.getDailyProblemList(this.page, this.size);
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.getDailyProblemList(this.page, this.size);
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.getDailyProblemList(this.page, this.size);
    }
  }

}
