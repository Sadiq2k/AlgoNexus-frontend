import { Component, OnInit } from '@angular/core';
import { UserService } from '../../userService/user.service';
import { Users } from '../../adminState/file-handler/users';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudinaryImageControllerService, UserControllerService } from '../../user-services/services';
import { UserAuthService } from '../../auth/user-auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  userEmail!:string;
  userId!:any;
  userImage!:string |undefined;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private cloudinaryImageControllerService: CloudinaryImageControllerService,
    private router:Router,
    private userAuthService:UserAuthService
  ) {
    this.userId = this.userAuthService.getUserId();
   console.log(this.userId);
   }
  // user = new Users();
  userProfile: any;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userEmail = params.get('email') || '';
    })
   this.loadUserProfile();
  }

loadUserProfile() {
  this.userService.getUserProfile(this.userId).subscribe({
    next: (userProfile) => {
      this.userProfile = userProfile;
      console.log(this.userProfile)
      this.userService.getImageByUserId(this.userId).subscribe({
        next: (userImages) => {
          this.userImage = userImages.imageUrl; 
          console.log("user images", this.userImage);
        },
      });
    },
    error: (error) => {
      console.error('Error retrieving user profile:', error);
    }
  });
}

redirectUserDetails(){
  this.router.navigate(['user-details']);
}

}
