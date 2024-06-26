import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Component/header/header.component';
import { LandingpageComponent } from './Component/landingpage/landingpage.component';
import { HomePageComponent } from './Component/home-page/home-page.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { FooterComponent } from './Component/footer/footer.component';
import { UserProfileComponent } from './Component/user-profile/user-profile.component';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivateAccountComponent } from './Component/activate-account/activate-account.component';
import { CodeInputModule } from 'angular-code-input';
import { NewPasswordComponent } from './forgotPassword/forgot-password/new-password/new-password.component';
import { ForgotPasswordComponent } from './forgotPassword/forgot-password/forgot-password.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin/admin.component';
import { ForbiddenComponent } from './Component/forbidden/forbidden.component';
import { StoreModule } from '@ngrx/store';
import { adminReducer } from './adminState/admin.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './adminState/admin.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MY_FORMATS, UserDetailsComponent } from './Component/user-profile/user-details/user-details.component';
import { UserAccountComponent } from './Component/user-profile/user-account/user-account.component';
import { AdminHeaderComponent } from './Component/header/admin-header/admin-header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ResetPasswordComponent } from './forgotPassword/reset-password/reset-password.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProblemsComponent } from './admin/problems/problems.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { SolutionComponent } from './admin/problems/solution/solution.component';
import { MONACO_PATH, MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { CardComponent } from './admin/cards/card/card.component';
import { ChartModule } from 'primeng/chart';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AddQuestionComponent } from './admin/problems/add-question/add-question.component';
import { ExampleComponent } from './admin/problems/example/example.component';
import { TestCaseComponent } from './admin/problems/testCase/test-case/test-case.component';
import { ProblemListComponent } from './Component/ProblemList/problem-list/problem-list.component';
import { CodingPageComponent } from './Component/ProblemList/coding-page/coding-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ExploreComponent } from './Component/explore/explore.component';
import { CourseDetailsComponent } from './Component/explore/course-details/course-details.component';
import { CouresComponent } from './admin/coures/coures.component';
import { AddCouresComponent } from './admin/coures/add-coures/add-coures.component';
import { CourseVideosComponent } from './admin/coures/course-videos/course-videos.component';
import { AddVideoComponent } from './admin/coures/add-video/add-video.component';
import { VideoEditModelComponent } from './admin/coures/video-edit-model/video-edit-model.component';
import { EditCourseComponent } from './admin/coures/edit-course/edit-course.component';
import { AddCategoryDialogComponent } from './admin/problems/add-category-dialog/add-category-dialog.component';
import { AllSubmissionsComponent } from './Component/user-profile/all-submissions/all-submissions.component';
import { CalendarModule } from 'primeng/calendar';
import { MyNetworkComponent } from './myNetwork/my-network/my-network.component';
import { SocialUserDetailsComponent } from './myNetwork/social-user-details/social-user-details.component';
import { DailyProblemsComponent } from './admin/daily-problems/daily-problems.component';
import { ServerComponent } from './SERVER-DOWN/server-down/server.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingpageComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    NewPasswordComponent,
    UserProfileComponent,
    ActivateAccountComponent,
    ForgotPasswordComponent,
    AdminComponent,
    ForbiddenComponent,
    UserDetailsComponent,
    UserAccountComponent,
    AdminHeaderComponent,
    ResetPasswordComponent,
    ProblemsComponent,
    UserManagementComponent,
    SolutionComponent,
    CardComponent,
    AddQuestionComponent,
    ExampleComponent,
    TestCaseComponent,
    ProblemListComponent,
    CodingPageComponent,
    ExploreComponent,
    CourseDetailsComponent,
    CouresComponent,
    AddCouresComponent,
    CourseVideosComponent,
    AddVideoComponent,
    VideoEditModelComponent,
    EditCourseComponent,
    AddCategoryDialogComponent,
    AllSubmissionsComponent,
    MyNetworkComponent,
    SocialUserDetailsComponent,
    DailyProblemsComponent,
    ServerComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CodeInputModule,
    StoreModule.forRoot({ user: adminReducer }),
    EffectsModule.forRoot([AdminEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 50, logOnly: !isDevMode() }),
    MatDatepickerModule,
    MatNativeDateModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatSnackBarModule,
    MonacoEditorModule,
    ChartModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule, // Required for toastr animations
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Set the position to top-right
      timeOut: 3000, // Duration to show the toast
      closeButton: true, // Show close button
      progressBar: true, // Show progress bar
    }),
    CalendarModule
  
    
  ],
  providers: [
    HttpClient,
    provideHttpClient(),
    provideClientHydration(),
    AuthGuard,
    provideAnimationsAsync(),
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe,
    {
      provide: MONACO_PATH,
      useValue: 'https://unpkg.com/monaco-editor@0.24.0/min/vs'
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
