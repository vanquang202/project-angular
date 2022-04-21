import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinalQuizService } from 'src/app/service/final-quiz.service';
import { QuizService } from 'src/app/service/quiz.service';
import * as moment from 'moment';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css'],
})
export class TakeQuizComponent implements OnInit {
  id_quiz: any;
  id_subject: any;
  questions: any = [];
  page: any;
  start_time: any;
  result: any = [];
  status_late: boolean = false;
  duration_minutes: any = 0;
  constructor(
    private final: FinalQuizService,
    private route: ActivatedRoute,
    private router: Router,
    private quiz: QuizService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.start_time = moment().format('YYYY/MM/DD hh:mm:ss');
    this.id_quiz = Number(this.route.snapshot.paramMap.get('id'));
    this.getQuiz();
    setInterval(() => {
      this.duration_minutes -= 1;
      if (this.duration_minutes == 1) {
        alert('Đã quá thời gian làm bài !');
        this.status_late = true;
        this.finishTest();
      }
    }, 60000);
  }

  getQuiz(): any {
    this.quiz.getQuiz(this.id_quiz).subscribe((data: any) => {
      if (data.payload.questions.length == 0) {
        alert('Không có quiz !');
        setTimeout(() => {
          this.location.back();
        }, 1000);
      } else {
        this.questions = data.payload.questions;
        this.id_subject = data.payload.subject_id;
        this.page = 0;
        this.duration_minutes = data.payload.duration_minutes;
      }
    });
  }
  clickAnswer(question_id: any, answer_id: any) {
    var key_check: any = null;
    const check = this.result.filter(function (data: any, key: any) {
      if (data.id == question_id) key_check = key;
      return data.id == question_id;
    });
    // console.log(key_check);

    if (check.length > 0) {
      this.result[key_check].answer = answer_id;
    } else {
      this.result.push({
        id: question_id,
        answer: answer_id,
      });
    }
  }
  checkedAnswer(id: any): boolean {
    const check = this.result.filter(function (data: any, key: any) {
      return data.answer == id;
    });
    if (check.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  finishTest() {
    if (this.result.length == this.questions.length) {
      const user_string: any = localStorage.getItem('user');
      const user = JSON.parse(user_string);
      this.final
        .passTest({
          email: user.user.email,
          quiz_id: this.id_quiz,
          subject_id: this.id_subject,
          result: this.result,
          start_time: this.start_time,
          end_time: moment().format('YYYY/MM/DD hh:mm:ss'),
          status_late: this.status_late,
        })
        .subscribe(
          (data: any) => {
            alert(
              'Bạn đã hoàn thành bài kiểm tra với số điểm : ' + data.payload
            );
            this.router.navigate(['/lich-su']);
          },
          (err: any) => {
            alert('Bài làm này không thể nộp !');
            this.router.navigate(['/']);
          }
        );
    } else {
      alert('Bạn chưa hoàn thành tất cả các câu hỏi !');
    }
  }

  perPage() {
    this.page = this.page - 1;
  }
  nextPage() {
    this.page = this.page + 1;
  }
}
