import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { GetAgePipe } from './helpers/pipes/get-age.pipe';
import { LoginComponent } from './screens/login/login.component';
import { HomeComponent } from './screens/home/home.component';
import { AdminlayoutComponent } from './layout/adminlayout/adminlayout.component';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { QuizComponent } from './screens/quiz/quiz.component';
import { FinalComponent } from './screens/final/final.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { StudentComponent } from './screens/student/student.component';
import { AddStudentComponent } from './screens/add-student/add-student.component';
import { EditStudentComponent } from './screens/edit-student/edit-student.component';
import { AddSubjectComponent } from './screens/add-subject/add-subject.component';
import { EditSubjectComponent } from './screens/edit-subject/edit-subject.component';
import { QuestionComponent } from './screens/question/question.component';
import { AddQuestionComponent } from './screens/add-question/add-question.component';
import { EditQuestionComponent } from './screens/edit-question/edit-question.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SubjectComponent } from './screens/subject/subject.component';
import { TakeQuizComponent } from './screens/take-quiz/take-quiz.component';
import { FormComponent } from './learn/form/form.component';
import { FormRegiterComponent } from './learn/form-regiter/form-regiter.component';
import { QuizAdminComponent } from './screens/quiz-admin/quiz-admin.component';
import { ModalComponent } from './plugins/modal/modal.component';
import { HistoryComponent } from './screens/history/history.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ToastrModule } from 'ngx-toastr';
import { TestDirective } from './test/test.directive';

@NgModule({
  declarations: [
    AppComponent,
    GetAgePipe,
    LoginComponent,
    HomeComponent,
    AdminlayoutComponent,
    HomelayoutComponent,
    QuizComponent,
    FinalComponent,
    DashboardComponent,
    StudentComponent,
    AddStudentComponent,
    EditStudentComponent,
    AddSubjectComponent,
    EditSubjectComponent,
    QuestionComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    SubjectComponent,
    TakeQuizComponent,
    FormComponent,
    FormRegiterComponent,
    QuizAdminComponent,
    ModalComponent,
    HistoryComponent,
    TestDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    NgbModule,
    HttpClientModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '492481953658-kkordag7qk9idf1ibgrcfcnlgtloc69k.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
