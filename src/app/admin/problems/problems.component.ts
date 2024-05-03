import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss'
})
export class ProblemsComponent {
  constructor(private router:Router){}

  goToAddQuestion(){
    this.router.navigate(['/add-question'])
  }

}
