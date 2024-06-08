import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { HomePageComponent } from './Component/home-page/home-page.component';
import { ActivateAccountComponent } from './Component/activate-account/activate-account.component';
import { UserProfileComponent } from './Component/user-profile/user-profile.component';
import { ForgotPasswordComponent } from './forgotPassword/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './forgotPassword/forgot-password/new-password/new-password.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin/admin.component';
import { ForbiddenComponent } from './Component/forbidden/forbidden.component';
import { UserDetailsComponent } from './Component/user-profile/user-details/user-details.component';
import { UserAccountComponent } from './Component/user-profile/user-account/user-account.component';
import { ProblemsComponent } from './admin/problems/problems.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { SolutionComponent } from './admin/problems/solution/solution.component';
import { CardComponent } from './admin/cards/card/card.component';
import { AddQuestionComponent } from './admin/problems/add-question/add-question.component';
import { ExampleComponent } from './admin/problems/example/example.component';
import { TestCaseComponent } from './admin/problems/testCase/test-case/test-case.component';
import { ProblemListComponent } from './Component/ProblemList/problem-list/problem-list.component';
import { CodingPageComponent } from './Component/ProblemList/coding-page/coding-page.component';
import { ExploreComponent } from './Component/explore/explore.component';
import { CourseDetailsComponent } from './Component/explore/course-details/course-details.component';
import { CouresComponent } from './admin/coures/coures.component';
import { AddCouresComponent } from './admin/coures/add-coures/add-coures.component';
import { CourseVideosComponent } from './admin/coures/course-videos/course-videos.component';
import { AddVideoComponent } from './admin/coures/add-video/add-video.component';
import { EditCourseComponent } from './admin/coures/edit-course/edit-course.component';
import { AllSubmissionsComponent } from './Component/user-profile/all-submissions/all-submissions.component';
import { MyNetworkComponent } from './myNetwork/my-network/my-network.component';
import { SocialUserDetailsComponent } from './myNetwork/social-user-details/social-user-details.component';
import path from 'path';
import { DailyProblemsComponent } from './admin/daily-problems/daily-problems.component';
import { ServerComponent } from './SERVER-DOWN/server-down/server.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'activate-account', component: ActivateAccountComponent },
  { path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'new-password-add', component: NewPasswordComponent },
  { path: 'admin/dashboard', component: CardComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'user-details', component: UserDetailsComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'user-account', component: UserAccountComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'user-problems', component: ProblemListComponent },
  { path: 'user-coding', component: CodingPageComponent },
  { path: 'add-question', component: AddQuestionComponent },
  { path: 'admin/problems', component: ProblemsComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/user-management', component: UserManagementComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/problems/solution', component: SolutionComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/problems/example', component: ExampleComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/problems/test-case', component: TestCaseComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'explore', component: ExploreComponent },
  { path: 'explore/course-details', component: CourseDetailsComponent },
  { path: 'admin/courses', component: CouresComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/courses/add', component: AddCouresComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/courses/edit', component: EditCourseComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/courses/course-videos', component: CourseVideosComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'admin/courses/course-videos/add', component: AddVideoComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'user/problem/submissions', component: AllSubmissionsComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'user/my-network', component: MyNetworkComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'user/social-media/user', component: SocialUserDetailsComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'admin/daily-problems', component: DailyProblemsComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'server-down', component: ServerComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
