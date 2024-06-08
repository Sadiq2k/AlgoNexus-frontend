import { Component } from '@angular/core';
import { CouresComponent } from '../../admin/coures/coures.component';
import { CourseControllerService } from '../../courses-services/services';
import { Router } from '@angular/router';
import { GetAllCourseTopic$Params } from '../../courses-services/fn/course-controller/get-all-course-topic';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {

  allCourses: any
  
  constructor(private courseService:CourseControllerService,
    private router:Router
  ){}
  filters = {
    level: '',
    topic: ''
  };

 

  filteredCourses = [];

  page: number = 0;
  size: number = 8;
  totalPages: number = 0;
  totalElements: number = 0;

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
        console.log(response)
        this.allCourses = response;
        this.totalPages = this.allCourses.totalPages;
        this.totalElements = this.allCourses.totalElements;
      },
      error: (err) => {
        console.log("error occure fetching courses", err)
      }
    })
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



  applyFilters() {
    this.filteredCourses = this.allCourses.filter((course: { level: string; topic: string; }) => {
      return (this.filters.level ? course.level === this.filters.level : true)
        && (this.filters.topic ? course.topic === this.filters.topic : true);
    });
  }

  filterByTopic(topic: string) {
    this.filters.topic = topic;
    this.applyFilters();
  }

  goToVideoDetails(courseID:number, topicname:string){
    console.log(courseID)
    

    this.router.navigate(['/explore/course-details',{courseId: courseID ,topicName:topicname}])
  }
  
}
