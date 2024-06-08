import { Component, OnInit } from '@angular/core';
import { UserService } from '../../userService/user.service';
import { Users } from '../../adminState/file-handler/users';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudinaryImageControllerService, UserControllerService } from '../../user-services/services';
import { UserAuthService } from '../../auth/user-auth.service';
import { error } from 'console';
import { DailyProblemControllerService, StreakControllerService } from '../../dailyProblem-services/services';
import { GetStreak$Params } from '../../dailyProblem-services/fn/streak-controller/get-streak';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  userEmail!: string;
  userId!: any;
  userImage!: string | undefined;
  totalDifficulties: any
  solvedProblems: any
  solvedEasy!: number
  solvedMedium!: number
  solvedHard!: number
  totalSovledProblems!: number
  recentSubmissionData: any
  totalProblemCount!: number;
  streaks!:number

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private cloudinaryImageControllerService: CloudinaryImageControllerService,
    private router: Router,
    private userAuthService: UserAuthService,
    private streakService: StreakControllerService
  ) {
    this.userId = this.userAuthService.getUserId();
  }
  // user = new Users();
  userProfile: any;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userEmail = params.get('email') || '';
    })
    this.loadUserProfile();
    this.getTotalCountDifficulty()
    this.getCountSolvedProblems(this.userId)
    this.getRecentSubmission();
    this.getStreak(this.userId)
    this.getUserProfilePic(this.userId)
  }

  loadUserProfile() {
    this.userService.getUserProfile(this.userId).subscribe({
      next: (userProfile) => {
        this.userProfile = userProfile;
      },
      error: (error) => {
        console.error('Error retrieving user profile:', error);
        if(error.status == 503){
          this.router.navigate(['/server-down'])
          
        }
          // window.location.reload();
        // }
      
      }
    });
  }

  getUserProfilePic(userId:string){
    this.userService.getImageByUserId(userId).subscribe({
      next: (userImages) => {
        this.userImage = userImages.imageUrl;
        // console.log("user images", this.userImage);
      },error:(err)=>{
        console.log("error occure while fetching the user profile pic",err)
      }
    });
  }

  redirectUserDetails() {
    this.router.navigate(['user-details']);
  }


  getTotalCountDifficulty() {
    this.userService.getTotalCountOfDifficulty().subscribe({
      next: (res) => {
        this.totalDifficulties = res
        this.totalProblemCount = this.totalDifficulties.reduce((total: any, difficulty: { totalCount: any; }) => {
          return total + difficulty.totalCount;
        }, 0);
      }, error: (err) => {
        console.log(err);
      }
    })
  }


  getCountSolvedProblems(userId: string) {
    this.userService.getCountSolvedProblems(userId).subscribe({
      next: (res) => {
        // console.log(res)
        this.solvedProblems = res
        this.solvedEasy = this.solvedProblems.Easy;
        this.solvedMedium = this.solvedProblems.Medium;
        this.solvedHard = this.solvedProblems.Hard;
        this.totalSovledProblems = this.solvedEasy + this.solvedMedium + this.solvedHard;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  getRecentSubmission() {
    this.userService.getRecentSubmission(this.userId).subscribe({
      next: (res) => {

        this.recentSubmissionData = res.submissions;
        // console.log("Recent submission", this.recentSubmissionData);
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  getEasyPercentage(): number {
    // console.log( this.totalDifficulties[0]?.totalCount)
    // console.log("easy percentage ", (this.solvedEasy / this.totalDifficulties[0]?.totalCount) * 100)
    return (this.solvedEasy / this.totalDifficulties[0]?.totalCount) * 100;
  }

  getMediumPercentage(): number {
    return (this.solvedMedium / this.totalDifficulties[1]?.totalCount) * 100;
  }

  getHardPercentage(): number {
    return (this.solvedHard / this.totalDifficulties[2]?.totalCount) * 100;
  }

  goToAllSubmissions() {
    this.router.navigate(['/user/problem/submissions'])
  }


  getStreak(userId:string) {
    const userID:GetStreak$Params={
      userId: userId
    }
    this.streakService.getStreak(userID).subscribe({
      next: (res) => {
        // console.log(res)
        this.streaks = res

      },error:(err)=>{
        console.log("error occure while fetching the streak count",err)
      }
    })
  }

}
