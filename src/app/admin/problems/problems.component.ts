import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemControllerService } from '../../problem-services/services';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class ProblemsComponent implements OnInit {
  selectedDifficulty: string = '';
  selectedCategory:string ='';

  constructor(private router: Router,
    private problemControllerService: ProblemControllerService

  ) { }


  goToAddQuestion() {
    this.router.navigate(['/add-question'])
  }
  allProblem: any

  ngOnInit(): void {
    this.problemControllerService.getAllProblems().subscribe({
      next: (res) => {
        this.allProblem = res;
      }, error: (err) => {
        console.log("error occur getting all problem", err);
      }
    })
  }
  searchbooll: boolean = false;
  searchQuery: string = '';
  items: any[] = []; // Replace 'any[]' with the type of your data
  filteredProblems!: any[];
  search(): void {
    if (this.searchQuery.trim() !== '') {
      this.searchbooll = true;
      this.filteredProblems = this.allProblem.filter((problem: { title: string; }) =>
        problem.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProblems = this.allProblem;
    }
  }


  onDifficultyChange() {
    this.searchbooll = true;
    let problems = this.allProblem;
    
    if (this.selectedDifficulty) {
      problems = problems.filter((problem: { difficulty: string }) =>
        problem.difficulty === this.selectedDifficulty
      );
    }

    this.filteredProblems = problems;
  }

  onCategoryChange(){
    console.log(this.selectedCategory);
    this.searchbooll = true;
    let problems = this.allProblem;
    
    if (this.selectedCategory) {
      problems = problems.filter((problem: { category: string }) =>
        problem.category === this.selectedCategory
      );
    }
    this.filteredProblems = problems;
  }


}
