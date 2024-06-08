import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemControllerService } from '../../../problem-services/services';
import { ProblemService } from '../../../problemService/problem.service';
import { GetAllProblems$Params } from '../../../problem-services/fn/problem-controller/get-all-problems';
import { DailyProblemControllerService } from '../../../dailyProblem-services/services';
import { GetDailyProblem$Params } from '../../../dailyProblem-services/fn/daily-problem-controller/get-daily-problem';
import { error } from 'console';



@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrl: './problem-list.component.scss'
})

export class ProblemListComponent {
  defaultProblem: any;

  constructor(private router: Router,
    private problemControllerService: ProblemControllerService,
    private problemService: ProblemService,
    private dailyProblemService: DailyProblemControllerService


  ) {
    this.date = new Date();
  }

  searchTerm: string = '';
  allProblem: any;
  filteredProblems: any[] = [];
  searchbooll: boolean = false;
  selectedDifficulty: string = '';
  page: number = 0;
  size: number = 15;
  totalPages: number = 0;
  totalElements: number = 0;
  date!: Date;
  latestCourse:any

  ngOnInit(): void {
    this.getAllProblems(this.page, this.size)
    this.getLatestCourse()
  }

  getAllProblems(page: number, size: number) {
    const pageAndSize: GetAllProblems$Params = {
      page: page,
      size: size
    }

    this.problemControllerService.getAllProblems(pageAndSize).subscribe({
      next: (res) => {

        this.allProblem = res;
        this.totalPages = this.allProblem.totalPages;
        this.totalElements = this.allProblem.totalElements;
        // console.log(this.allProblem)
        this.filteredProblems = this.allProblem.content
      }, error: (err) => {
        console.log("error occur ", err);
        if(err.status == 503){
          this.router.navigate(['/server-down'])
          
        }
      }
    })

  }



  goToPage(page: number): void {
    this.page = page;
    this.getAllProblems(this.page, this.size);
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.getAllProblems(this.page, this.size);
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.getAllProblems(this.page, this.size);
    }
  }



  search(): void {
    this.filterProblems()
  }
  filterProblems(): void {
    if (!this.allProblem || !this.allProblem.content) return;
    const searchTerm = this.searchTerm ? this.searchTerm.trim().toLowerCase() : '';
    const selectedDifficulty = this.selectedDifficulty ? this.selectedDifficulty.trim().toLowerCase() : '';
    let filteredBySearch = this.allProblem.content.filter((problem: { title: string }) =>
      problem.title.toLowerCase().includes(searchTerm)
    );

    if (selectedDifficulty) {
      filteredBySearch = filteredBySearch.filter((problem: { difficulty: string }) =>
        problem.difficulty.toLowerCase().includes(selectedDifficulty)
      );
    }

    if (filteredBySearch.length > 0) {
      this.defaultProblem = ''
      this.filteredProblems = filteredBySearch;
      this.searchbooll = true;
    } else {
      this.defaultProblem = this.allProblem.content[0];
      // console.log(this.defaultProblem)
      this.searchbooll = false;
      this.filteredProblems = [];
    }
  }


  goToProblemDetails(ProblemId: any) {
    this.router.navigate(['user-coding', { problemId: ProblemId }]);
  }

  onDateSelect(event: any) {
    this.date = event;
    // console.log('Selected date:', this.date);
    this.fetchDailyProblemForDate(this.date);
  }

  fetchDailyProblemForDate(selectedDate: Date) {
    // console.log('Fetching problem for date:', selectedDate);
    const date: GetDailyProblem$Params = {
      date: selectedDate
    }
    this.dailyProblemService.getDailyProblem(date).subscribe({
      next: (res) => {
        // console.log('Problem for selected date:', res);
        const problemId = res.problemId;
        this.goToProblemDetails(problemId);
      },
      error: (err) => {
        console.error('Error fetching problem for date:', err);
      }
    }
    );
  }

  getLatestCourse(){
    this.problemService.getLatestCourse().subscribe({
      next:(res)=>{
        this.latestCourse = res;
        console.log(this.latestCourse)
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  transform(value: string, limit: number): string {
    if (!value) return '';
    const words = value.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : value;
  }

  goToVideoDetails(courseID:number, topicname:string){
    console.log(courseID)
    

    this.router.navigate(['/explore/course-details',{courseId: courseID ,topicName:topicname}])
  }


}
