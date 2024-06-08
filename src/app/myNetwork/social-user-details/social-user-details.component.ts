import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../userService/user.service';
import { GetStreak$Params } from '../../dailyProblem-services/fn/streak-controller/get-streak';
import { StreakControllerService } from '../../dailyProblem-services/services';

@Component({
  selector: 'app-social-user-details',
  templateUrl: './social-user-details.component.html',
  styleUrl: './social-user-details.component.scss'
})
export class SocialUserDetailsComponent implements OnInit {



  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private streakService: StreakControllerService
  ) { }

  userId!: string
  userDetails!: any;
  userEmail!: string;
  userImage!: string | undefined;
  totalDifficulties: any
  solvedProblems: any
  solvedEasy!: number
  solvedMedium!: number
  solvedHard!: number
  totalSovledProblems!: number
  recentSubmissionData: any
  totalProblemCount!: number;
  streaks!: number

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId') || '';
    });
    console.log(this.userId)
    this.getUserDetails(this.userId)
    this.getTotalCountDifficulty()
    this.getCountSolvedProblems(this.userId)
    this.getRecentSubmission();
    this.getStreak(this.userId)
  }



  getUserDetails(userId: string) {
    this.userService.getUserProfile(userId).subscribe({
      next: (res) => {
        this.userDetails = res;
      },
      error: (error) => {
        console.error('Error retrieving user profile:', error);
        // if(error.error.status == 0){
        // window.location.reload();
        // }

      }
    });
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
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  getEasyPercentage(): number {
    return (this.solvedEasy / this.totalDifficulties[0]?.totalCount) * 100;
  }

  getMediumPercentage(): number {
    return (this.solvedMedium / this.totalDifficulties[1]?.totalCount) * 100;
  }

  getHardPercentage(): number {
    return (this.solvedHard / this.totalDifficulties[2]?.totalCount) * 100;
  }


  getStreak(userId: string) {
    const userID: GetStreak$Params = {
      userId: userId
    }
    this.streakService.getStreak(userID).subscribe({
      next: (res) => {
        this.streaks = res

      }, error: (err) => {
        console.log("error occure while fetching the streak count", err)
      }
    })
  }

}
