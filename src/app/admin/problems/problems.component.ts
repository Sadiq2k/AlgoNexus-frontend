import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemControllerService } from '../../problem-services/services';
import { GetAllProblems$Params } from '../../problem-services/fn/problem-controller/get-all-problems';
import { ProblemService } from '../../problemService/problem.service';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class ProblemsComponent implements OnInit {
  selectedDifficulty: string = '';
  selectedCategory: string = '';
  searchbooll: boolean = false;
  searchQuery: string = '';
  items: any[] = []; // Replace 'any[]' with the type of your data
  filteredProblems!: any[];
  allCategories: any

  constructor(private router: Router,
    private problemControllerService: ProblemControllerService,
    private problemService: ProblemService

  ) { }


  goToAddQuestion() {
    this.router.navigate(['/add-question'])
  }
  allProblem: any
  skelton: boolean = false;
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;

  ngOnInit(): void {
    this.getAllProblems(this.page, this.size);
    this.getAllCategory()
  }

  getAllProblems(page: number, size: number) {
    this.skelton = true;
    const peagable: GetAllProblems$Params = {
      page: page,
      size: size
    }
    this.problemControllerService.getAllProblems(peagable).subscribe({
      next: (res) => {
        this.allProblem = res;
        this.totalPages = this.allProblem.totalPages;
        this.totalElements = this.allProblem.totalElements;
        this.skelton = false;
      }, error: (err) => {
        console.log("error occur getting all problem", err);
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
    if (this.searchQuery.trim() !== '') {
      this.searchbooll = true;
      this.filteredProblems = this.allProblem.content.filter((problem: { title: string; }) =>
        problem.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProblems = this.allProblem.content;
    }
  }

  getAllCategory() {
    const category = true;
    this.problemService.getAllCategoties(category).subscribe({
      next: (res) => {
        this.allCategories = res.categories;
      }
    })

  }


  onDifficultyChange() {
    this.searchbooll = true;
    let problems = this.allProblem;

    if (this.selectedDifficulty) {
      problems = problems.content.filter((problem: { difficulty: string }) =>
        problem.difficulty === this.selectedDifficulty
      );
    }
    this.filteredProblems = problems;
  }

  onCategoryChange() {
    this.searchbooll = true;
    let problems = this.allProblem;

    if (this.selectedCategory) {
      problems = problems.content.filter((problem: { category: string }) =>
        problem.category === this.selectedCategory
      );
    }
    this.filteredProblems = problems;
  }


}
