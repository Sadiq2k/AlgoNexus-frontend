import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../auth/user-auth.service';
import { DataShareService } from '../../dataShare/data-share.service';
import { StreakControllerService } from '../../dailyProblem-services/services';
import { GetDailyStreak$Params } from '../../dailyProblem-services/fn/streak-controller/get-daily-streak';
import { UserService } from '../../userService/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  userImage!: string | undefined;
  role: any;
  token: string = '';
  userId!: string
  dailyStreak!: number;

  constructor(private userAuthService: UserAuthService,
    private router: Router,
    private dataShareSerivce: DataShareService,
    private streakService: StreakControllerService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.userAuthService.getUserId() as string;
    this.getDailyStreak(this.userId)
    this.getUserProfilePic(this.userId)
  }
  isMobileMenuOpen: boolean = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  getDailyStreak(userId: string) {

    const userID: GetDailyStreak$Params = {
      userId: userId
    }
    this.streakService.getDailyStreak(userID).subscribe({
      next: (res) => {
        this.dailyStreak = res;
      }, error: (err) => {
        if(err.status == 200){
          
        }
        console.log(err)
      }
    })
  }

  getUserProfilePic(userId:string){
    this.userService.getImageByUserId(userId).subscribe({
      next: (userImages) => {
        this.userImage = userImages.imageUrl;
        console.log("user images", this.userImage);
      },error:(err)=>{
        console.log("error occure while fetching the user profile pic",err)
      }
    });
  }

  getingRole() {
    this.role = this.dataShareSerivce.getRole();
    console.log("header", this.role);
  }


  loggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  login() {
    this.router.navigate(['login']);
  }

  logOut() {
    this.userAuthService.clear();
    this.router.navigate(['home']);
  }

  isLoggedIn: boolean = false;


  toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }



}
