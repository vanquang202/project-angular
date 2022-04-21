import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  id_subject: any = null;
  quizs: any;
  loading: boolean = false;
  constructor(private route: ActivatedRoute , private subject : SubjectService , private router: Router) { }

  ngOnInit(): void {
    this.id_subject = this.route.snapshot.paramMap.get('id');
    this.fetchQuiz();
  }

  fetchQuiz(): void {
    this.loading = true;
    this.subject.showSubject(this.id_subject).subscribe(
      (data : any) => {
        this.quizs = data.payload.quizs;
      },
      (err : any) => {},
      () => {this.loading = false;}
    );
  }

}
