import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudinaryImageControllerService, UserControllerService } from '../../../user-services/services';
import { DataShareService } from '../../../dataShare/data-share.service';
import { UserService } from '../../../userService/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fail } from 'assert';
import { MatDateFormats } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { UserAuthService } from '../../../auth/user-auth.service';
import { Observable } from 'rxjs';
import { UploadImage$Params } from '../../../user-services/fn/cloudinary-image-controller/upload-image';

export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  editFormName!: FormGroup;
  editFormGender!: FormGroup;
  editFormLocation!: FormGroup;
  editFormBirthday!: FormGroup;
  editFormgithub!: FormGroup;
  editFormlinkedin!: FormGroup;
  editFormWork!: FormGroup;

  userDetails: any;
  enableUserAccount: boolean = false;
  isEditingFirstName: boolean = false;
  isEditingLastName: boolean = false;
  editedFirstName: string = '';
  editedLastName: string = '';
  editedLocation: string = '';
  editedgithub: string = '';
  editedlinkedin: string = '';
  editedwork: string ='';
  editedBirthday: any;
  isEditingGender: boolean = false;
  isEditingLocation: boolean = false;
  isEditingBirthday: boolean = false;
  isEditinggithub: boolean = false;
  isEditingLinkedin: boolean = false;
  isEditingwork:boolean =false;

  @ViewChild('datepickerInput') datepickerInput!: ElementRef<HTMLInputElement>;
  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;

  userId!:string;
  userImage: string |undefined;



  constructor(
    private router: Router,
    private userControllerService: UserControllerService,
    private dataSharing: DataShareService,
    private userService: UserService,
    private cloudinaryImageControllerService: CloudinaryImageControllerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private userAuthService:UserAuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.userAuthService.getUserId();
   console.log(this.userId);
   this.loadUserProfile(this.userId);

  }

  initializeForm(): void {
    this.editFormName = this.fb.group({
      firstname: [this.userDetails?.firstname || ''],
      lastname: [this.userDetails?.lastname || ''],
      id: [this.userDetails?.id || '']
    });

    this.editFormGender = this.fb.group({
      gender: [this.userDetails?.gender || ''],
      id: [this.userDetails?.id || '']
    });

    this.editFormGender = this.fb.group({
      location: [this.userDetails?.location || ''],
      id: [this.userDetails?.id || '']
    });

    this.editFormLocation = this.fb.group({
      location: [this.userDetails?.location || ''],
      id: [this.userDetails?.id || '']
    });

    this.editFormBirthday = this.fb.group({
      birthday: [this.userDetails?.birthday || ''],
      id: [this.userDetails?.id || '']
    });
    this.editFormgithub = this.fb.group({
      github: [this.userDetails?.github || ''],
      id: [this.userDetails?.id || '']
    });
    this.editFormlinkedin = this.fb.group({
      linkedin: [this.userDetails?.linkedin || ''],
      id: [this.userDetails?.id || '']
    });
    this.editFormWork = this.fb.group({
      linkedin: [this.userDetails?.work || ''],
      id: [this.userDetails?.id || '']
    });


  }


  loadUserProfile(userId: string): void {
    this.userService.getUserProfile(userId).subscribe({
      next: (userProfile) => {
        this.userDetails = userProfile;
        this.initializeForm();
        this.userService.getImageByUserId(userId).subscribe({
          next: (userImages) => {
            this.userImage = userImages.imageUrl;
            console.log("user images", userImages);
          },
        
        });
      },
      error: (error) => {
        console.error('Error retrieving user details:', error);
      }
    });
  }


  toggleDatePicker(): void {
    this.isEditingBirthday = !this.isEditingBirthday;
  }


  onDateChanged(event: any): void {
    this.editedBirthday = event.value;
  }


  startEditing(field: string): void {
    switch (field) {
      case 'fullname':
        this.isEditingFirstName = true;
        this.isEditingLastName = true;
        break;
      case 'gender':
        this.isEditingGender = true;
        break;
      default:
        break;
      case 'location':
        this.isEditingLocation = true;
        this.editedLocation = this.userDetails?.location;
        break;
      case 'birthday':
        this.isEditingBirthday = true;
        this.editedBirthday = this.userDetails?.dateOfBirth;
        setTimeout(() => {
          this.datepickerInput.nativeElement.focus();
        }, 0);
        break;

      case 'github':
        this.isEditinggithub = true;
        this.editedgithub = this.userDetails?.github;
        break;

        case 'linkedin':
          this.isEditingLinkedin = true;
          this.editedlinkedin = this.userDetails?.linkedin;
          break;
          case 'work':
            this.isEditingwork = true;
            this.editedwork = this.userDetails?.work;
            break;
    }
  }


  saveEdit(field: string): void {

    switch (field) {
        case 'fullname':
            this.isEditingFirstName = false;
            this.isEditingLastName = false;

            const fullname = this.editFormName.value;
            console.log(fullname);
            this.userControllerService.setFullName({ body: fullname }).subscribe({
                next: (res) => {
                    this.userDetails.firstname = fullname.firstname;
                    this.userDetails.lastname = fullname.lastname;
                },
                error: (err) => {
                    console.log("error occure user details component changing full name", err);
                }

            });

            break;
        case 'gender':
            this.isEditingGender = false;
            const gender = this.editFormGender.value;
            this.userControllerService.setGender({ body: gender }).subscribe({
                next: (res) => {
                    this.userDetails.gender = gender.gender;
                }, error: (err) => {
                    console.log("error occure user details component update the gender", err);
                }
            });
            break;

        case 'location':
            this.isEditingLocation = false;
            const location = this.editFormLocation.value;
            this.userControllerService.setLocation({ body: location }).subscribe({
                next: (res) => {
                    this.userDetails.location = location.location;
                }, error: (err) => {
                    console.log("error occure user details component update the location", err);
                }
            });
            break;

        case 'birthday':
            this.isEditingBirthday = false;
            const birthday = this.editFormBirthday.value;

            birthday.birthday = this.datePipe.transform(birthday.birthday, 'yyyy-MM-dd');
            console.log(birthday.birthday)
            this.userControllerService.setBirthday({ body: birthday }).subscribe({
                next: (res) => {
                    this.userDetails.dateOfBirth = birthday.birthday;
                },
                error: (err) => {
                    console.log('error occure user details component while updating birthday', err);
                }
            });
            break;
        case 'github':
            this.isEditinggithub = false;
            const Github = this.editFormgithub.value;

            this.userControllerService.setGithub({ body: Github }).subscribe({
                next: (res) => {
                    this.userDetails.github = Github.github;
                }, error: (err) => {
                    console.log("error occure user details component updating github link", err);
                }
            });

            break;
        case 'linkedin':
            this.isEditingLinkedin = false
            const Linkedin = this.editFormlinkedin.value;
            console.log(Linkedin.linkedin)
            this.userControllerService.setLinkedIn({ body: Linkedin }).subscribe({
                next: (res) => {
                    this.userDetails.linkedin = Linkedin.linkedin;
                }, error: (err) => {
                    console.log("error occure user details component linkedin link", err);
                }
            });
            break;

            case 'work':
              this.isEditingLinkedin = false
              const Work = this.editFormWork.value;
              console.log(Work.work)
              this.userControllerService.setWork({ body: Work }).subscribe({
                  next: (res) => {
                      this.userDetails.work = Work.work;
                  }, error: (err) => {
                      console.log("error occure user details component updating work link", err);
                  }
              });
              break;
    }
}

  cancelEdit(field: string): void {
    switch (field) {
      case 'fullname':
        this.isEditingFirstName = false;
        this.isEditingLastName = false;
        break;
      case 'gender':
        this.isEditingGender = false;
        break;
      case 'location':
        this.isEditingLocation = false;
        break;
      case 'birthday':
        this.isEditingBirthday = false;
        break;
      case 'github':
        this.isEditinggithub = false;
        break;
        case 'linkedin':
        this.isEditingLinkedin = false;
        break;
        case 'work':
          this.isEditingwork = false;
          break;
      default:
        this.initializeForm();
        break;
    }
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  changedProfilePic() {
    this.fileInput.nativeElement.click();
  }
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadImage(this.userId, file);
  }
  
  uploadImage(userId: string, file: File) {
    const params: UploadImage$Params = {
      userId: userId,
      image: file
    };

    this.cloudinaryImageControllerService.uploadImage(params).subscribe({
      next: (res) => {
        console.log("Successfully uploaded image", res);
      },
      error: (err) => {
        console.log("Error occurred during image uploading ", err);
      }
    });
}




  userAccount(): void {
    this.enableUserAccount = true;
    this.router.navigate(['user-account']);
  }
}
