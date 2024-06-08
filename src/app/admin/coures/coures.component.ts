import { Component, OnInit } from '@angular/core';
import { CourseControllerService } from '../../courses-services/services';
import { DeleteTopic$Params } from '../../courses-services/fn/course-controller/delete-topic';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataShareService } from '../../dataShare/data-share.service';
import { GetAllCourseTopic$Params, getAllCourseTopic } from '../../courses-services/fn/course-controller/get-all-course-topic';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-coures',
  templateUrl: './coures.component.html',
  styleUrl: './coures.component.scss'
})
export class CouresComponent implements OnInit {


  constructor(private courseService: CourseControllerService,
    private router: Router,
    private dataSharing:DataShareService,
    private snackBar: MatSnackBar
  ) { }

  allCourses: any

  page: number = 0;
  size: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;

  searchQuery: string = '';
  filteredCourses:any;
  searchbooll:boolean = false;

  ngOnInit(): void {
    this.getCourses(this.page, this.size);
  }

  getCourses(page: number, size: number): void {

    const pagesize : GetAllCourseTopic$Params ={
      page: this.page,
      size: this.size
    }
    this.courseService.getAllCourseTopic(pagesize).subscribe({
      next: (response) => {
        this.allCourses = response;
        this.totalPages = this.allCourses.totalPages;
        this.totalElements = this.allCourses.totalElements;

        this.filteredCourses = this.allCourses.content;
      },
      error: (err) => {
        console.log("error occure fetching courses", err)
      }
    })
  }

  search(): void {
    if (this.searchQuery.trim() !== '') {
      this.searchbooll = true;
      this.filteredCourses = this.allCourses.content.filter((course: { courses: { topicName: string } }) =>
        course.courses.topicName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.searchbooll = false;
      this.filteredCourses = this.allCourses.content;
    }
  }
  
  
  goToPage(page: number): void {
    this.page = page;
    this.getCourses(this.page, this.size);
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.getCourses(this.page, this.size);
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.getCourses(this.page, this.size);
    }
  }

  deleteCourseTopic(courseId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this course topic?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Close'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Related videos will be deleted',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33', // Red color for confirm button
          cancelButtonColor: '#3085d6', // Default color for cancel button
          confirmButtonText: 'Yes, delete it',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            const courseID: DeleteTopic$Params = { courseId };

            this.courseService.deleteTopic(courseID).subscribe({
              next: (res) => {
                Swal.fire(
                  'Deleted!',
                  'The video has been deleted.',
                  'success'
                ).then(() => {
                  this.router.navigateByUrl('/admin/dashboard').then(() => {
                    this.router.navigate(['/admin/courses']);
                  });                });
                
              },
              error: (err) => {
                console.log("Error occurred while deleting the topic", err);
              }
            });
          }
        });
      }
    });
  }



  goToCourseVideoPage(courseI: number,topicname:string) {
    this.router.navigate(['/admin/courses/course-videos', { courseId: courseI, topicName:topicname }])
  }

  editCourseTopic(course: any) {
    this.dataSharing.sendFormCourse(course);
    this.router.navigate(['/admin/courses/edit'])
    }

  

}
