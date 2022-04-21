import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminlayoutComponent } from './layout/adminlayout/adminlayout.component';
import { HomelayoutComponent } from './layout/homelayout/homelayout.component';
import { HomeComponent } from './screens/home/home.component';
import { StudentComponent } from './screens/student/student.component';
import { AddStudentComponent } from './screens/add-student/add-student.component';
import { EditStudentComponent } from './screens/edit-student/edit-student.component';
import { AddSubjectComponent } from './screens/add-subject/add-subject.component';
import { EditSubjectComponent } from './screens/edit-subject/edit-subject.component';
import { QuestionComponent } from './screens/question/question.component';
import { AddQuestionComponent } from './screens/add-question/add-question.component';
import { EditQuestionComponent } from './screens/edit-question/edit-question.component';
import { LoginComponent } from './screens/login/login.component';
import { SubjectComponent } from './screens/subject/subject.component';
import { QuizComponent } from './screens/quiz/quiz.component';
import { FinalComponent } from './screens/final/final.component';
import { TakeQuizComponent } from './screens/take-quiz/take-quiz.component';
import { FormComponent } from './learn/form/form.component';
import { FormRegiterComponent } from './learn/form-regiter/form-regiter.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { QuizAdminComponent } from './screens/quiz-admin/quiz-admin.component';
import { HistoryComponent } from './screens/history/history.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'form-register',
    component: FormRegiterComponent,
  },
  {
    path: '',
    component: HomelayoutComponent,
    canActivate: [LoginGuard] ,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'mon-hoc',
        component: SubjectComponent,
      },
      {
        path: 'quiz/:id',
        component: QuizComponent,
      },
      {
        path: 'take-quiz/:id/:name',
        component: TakeQuizComponent,
      },
      {
        path: 'quiz/:id/:ket-qua',
        component: FinalComponent,
      },
      {
        path: 'lich-su',
        component: HistoryComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminlayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'sinh-vien',
        component: StudentComponent,
      },
      {
        path: 'sinh-vien/add',
        component: AddStudentComponent,
      },
      {
        path: 'sinh-vien/edit/:id',
        component: EditStudentComponent,
      },
      {
        path: 'mon-hoc',
        component: SubjectComponent,
      },
      {
        path: 'mon-hoc/add',
        component: AddSubjectComponent,
      },
      {
        path: 'mon-hoc/edit/:id',
        component: EditSubjectComponent,
      },
      {
        path: 'cau-hoi/:id',
        component: QuestionComponent,
      },
      {
        path: 'quiz/:id',
        component: QuizAdminComponent,
      },

      {
        path: 'cau-hoi/add',
        component: AddQuestionComponent,
      },
      {
        path: 'cau-hoi/edit/:id',
        component: EditQuestionComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
