import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../../../problemService/problem.service';
import { UserAuthService } from '../../../auth/user-auth.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-submissions',
  templateUrl: './all-submissions.component.html',
  styleUrl: './all-submissions.component.scss'
})
export class AllSubmissionsComponent implements OnInit{
  userId!: string;
  allSubmissions: any;
  page: number = 0;
  size: number = 20;
  totalPages: number = 0;

  constructor(private problemService: ProblemService,
     private userAuthService: UserAuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.userId = this.userAuthService.getUserId();
    this.getAllSubmissions(this.page, this.size);
  }

  getAllSubmissions(page: number, size: number): void {
    this.problemService.getAllSubmissions(this.userId, page, size).subscribe({
      next: (res) => {
        this.allSubmissions = res;
        console.log(this.allSubmissions)
        this.totalPages =   this.allSubmissions.totalPages;
      },
      error: (err) => {
        console.log(err);
        if(err.status == 503){
          this.router.navigate(['/server-down'])
          
        }
      }
    });
  }

  goToPage(page: number): void {
    this.page = page;
    this.getAllSubmissions(this.page, this.size);
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.getAllSubmissions(this.page, this.size);
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.getAllSubmissions(this.page, this.size);
    }
  }

}
