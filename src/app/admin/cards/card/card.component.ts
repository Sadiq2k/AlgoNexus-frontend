import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  data: any;
  options: any;
  userData:any
  userOptions:any

  constructor() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Users Data',
          data: [65, 59, 80, 81, 56, 55, 40],
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
            color: 'rgba(255, 255, 255, 0.1)', // Change the color of the vertical grid lines to white
          },
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)', // Change the color of the horizontal grid lines to white
          },
        },
      },
    };

   
  
  }

}
