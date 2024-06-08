import { Component, OnInit } from '@angular/core';
import { UserService } from '../../userService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-network',
  templateUrl: './my-network.component.html',
  styleUrl: './my-network.component.scss'
})
export class MyNetworkComponent implements OnInit {

  allSocialMediaUser: any
  page: number = 0;
  size: number = 15;
  totalPages: number = 0;
  totalElements: number = 0;

  constructor(private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUsers(this.page, this.size)
  }

  getAllUsers(page: number, size: number) {
    this.userService.getAllSocialMediaUsers(page, size).subscribe({
      next: (res) => {
        this.allSocialMediaUser = res;
        this.totalPages = res.totalPages
        this.totalElements = res.totalElements
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  goToPage(page: number): void {
    this.page = page;
    this.getAllUsers(this.page, this.size);
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.getAllUsers(this.page, this.size);
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.getAllUsers(this.page, this.size);
    }
  }

  onImageClick(userid: any): void {
    this.router.navigate(['/user/social-media/user', { userId: userid }])


  }


}
