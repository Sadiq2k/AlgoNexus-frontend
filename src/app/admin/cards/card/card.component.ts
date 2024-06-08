import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { UserService } from '../../../userService/user.service';
import { error } from 'node:console';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{

  data: any;
  options: any;
  totalUsers!: number;
  totalProblems!: number;
  totalCourse!: number;
  totalSubmission: number = 0;
  totalAcceptence: number = 0;
  registrationUser: any = {};

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {
    this.data = {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: 'Users Data',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    };
  }

  ngOnInit(): void {
    this.getTotalUsers();
    this.getTotalProblem();
    this.getTotalCourse();
    this.getTotalSubmission();
    this.getTotalAcceptence();
    this.registrationUsers();
  }

  registrationUsers() {
    this.userService.getRegistrationUsers().subscribe({
      next: (res) => {
        this.registrationUser = res;
        this.updateChartData();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateChartData() {
    const monthlyData = this.data.labels.map((month: string) => {
      return this.registrationUser[month] || 0;
    });

    this.data.datasets[0].data = monthlyData;
    this.cdr.detectChanges();
  }

  getTotalUsers(){
    this.userService.getTotalUsers().subscribe({
      next:(res)=>{
        this.totalUsers = res as number;
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  getTotalProblem(){
    this.userService.getTotalProblem().subscribe({
      next:(res)=>{
        this.totalProblems = res as number;
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  getTotalCourse(){
    this.userService.getTotalCourse().subscribe({
      next:(res)=>{
        this.totalCourse = res as number;
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  getTotalSubmission(){
    this.userService.getTotalSubmission().subscribe({
      next:(res)=>{
        this.totalSubmission = res as number;
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  getTotalAcceptence(){
    this.userService.getTotalAcceptence().subscribe({
      next:(res)=>{
        this.totalAcceptence = res as number;
      },error:(err)=>{
        console.log(err)
      }
    })
  }

}
