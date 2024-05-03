import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.scss'
})
export class ForbiddenComponent {
  showModal: boolean = false;

  constructor(private router:Router){}
  
  // Method to show the modal
  showModals() {
    this.showModal = true;
  }

  // Method to hide the modal
  hideModal() {
    this.showModal = false;
this.router.navigate(['/home'])
  }
}
