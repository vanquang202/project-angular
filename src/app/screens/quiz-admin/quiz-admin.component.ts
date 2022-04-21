import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import { SubjectService } from 'src/app/service/subject.service';
import * as moment from 'moment';

@Component({
  selector: 'app-quiz-admin',
  templateUrl: './quiz-admin.component.html',
  styleUrls: ['./quiz-admin.component.css'],
})
export class QuizAdminComponent implements OnInit {
  id_subject: any = null;
  quizs: any;
  links: any;
  loading: boolean = false;
  flagModal: boolean = false;
  flag_form: boolean = false;
  data_update: any = null;

  form_quiz: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    duration_minutes: new FormControl('', [Validators.required]),
    start_time: new FormControl('', [Validators.required]),
    end_time: new FormControl('', [Validators.required]),
    is_shuffle: new FormControl(0),
  });

  constructor(
    private route: ActivatedRoute,
    private quiz: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_subject = this.route.snapshot.paramMap.get('id');
    this.fetchQuiz();
  }

  fetchQuiz(url: any = null): void {
    this.loading = true;
    this.quiz.getQuizAdmin(url ?? null, this.id_subject).subscribe(
      (data: any) => {
        this.quizs = data.payload.data;
        this.links = data.payload.links;
      },
      (err: any) => {},
      () => {
        this.loading = false;
      }
    );
  }

  storeQuiz() {
    const user: any = localStorage.getItem('user');

    this.quiz
      .storeQuizAdmin({
        name: this.form_quiz.controls['name'].value,
        is_shuffle: this.form_quiz.controls['is_shuffle'].value,
        duration_minutes: this.form_quiz.controls['duration_minutes'].value,
        start_time: moment(this.form_quiz.controls['start_time'].value).format(
          'YYYY/MM/DD hh:mm:ss'
        ),
        end_time: moment(this.form_quiz.controls['end_time'].value).format(
          'YYYY/MM/DD hh:mm:ss'
        ),
        subject_id: this.id_subject,
        email: JSON.parse(user).user['email'],
      })
      .subscribe((data: any) => {
        if (!data.status) return alert(data.payload);
        this.flag_form = false;
        this.form_quiz.controls['name'].setValue('');
        this.form_quiz.controls['duration_minutes'].setValue('');
        this.form_quiz.controls['start_time'].setValue('');
        this.form_quiz.controls['end_time'].setValue('');
        this.form_quiz.controls['is_shuffle'].setValue(0);
        this.fetchQuiz();
      });
  }

  editQuiz(data: any) {
    this.data_update = data;
    this.form_quiz.controls['name'].setValue(data.name);
    this.form_quiz.controls['duration_minutes'].setValue(data.duration_minutes);
    this.form_quiz.controls['start_time'].setValue(
      moment(data.start_time).format('YYYY-MM-DDThh:mm')
    );
    this.form_quiz.controls['end_time'].setValue(
      moment(data.end_time).format('YYYY-MM-DDThh:mm')
    );
    this.form_quiz.controls['is_shuffle'].setValue(data.is_shuffle);
    this.flag_form = true;
  }

  updateQuiz() {
    this.quiz
      .updateQuizAdmin(this.data_update.id, {
        name: this.form_quiz.controls['name'].value,
        is_shuffle: this.form_quiz.controls['is_shuffle'].value,
        duration_minutes: this.form_quiz.controls['duration_minutes'].value,
        start_time: moment(this.form_quiz.controls['start_time'].value).format(
          'YYYY/MM/DD hh:mm:ss'
        ),
        end_time: moment(this.form_quiz.controls['end_time'].value).format(
          'YYYY/MM/DD hh:mm:ss'
        ),
        subject_id: this.id_subject,
      })
      .subscribe(
        (data: any) => {
          this.data_update = null;
          this.form_quiz.controls['name'].setValue('');
          this.form_quiz.controls['duration_minutes'].setValue('');
          this.form_quiz.controls['start_time'].setValue('');
          this.form_quiz.controls['end_time'].setValue('');
          this.form_quiz.controls['is_shuffle'].setValue(0);
          this.flag_form = false;
          this.fetchQuiz();
        },
        (err: any) => {
          alert('Kông thể cập nhật môn học !');
        }
      );
  }

  deleteQuiz(id: any) {
    if (!confirm('Bạn có muốn xóa không !')) return;

    this.quiz.deleteQuiz(id).subscribe(
      (data: any) => {
        this.fetchQuiz();
      },
      (err: any) => {
        alert('Không thể xóa môn học !');
      }
    );
  }

  perPage(url: any): any {
    if (url) this.fetchQuiz(url);
  }

  changeStatusQuiz(data: any): any {
    if (data.status == 0)
      return this.quiz.unStatus(data.id).subscribe((data: any) => {
        this.fetchQuiz();
      });
    return this.quiz.reStatus(data.id).subscribe((data: any) => {
      this.fetchQuiz();
    });
  }
}
