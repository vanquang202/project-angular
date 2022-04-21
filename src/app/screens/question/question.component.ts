import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  id_quiz: any;
  id_subject: any;
  page: any ;
  start_time: any ;
  status_late: boolean = false;
  flag_form: boolean = false ;
  duration_minutes: any  = 0 ;
  dataAnswer: any = [1,2,3,4];
  questions: any = [];
  result: any = [];
  dataIdsAnswer: any = [];
  data_update: any = null;
  form_question: FormGroup = new FormGroup({
    name: new FormControl('',[ Validators.required]),
    content_1: new FormControl('',[ Validators.required]),
    content_2: new FormControl('',[ Validators.required]),
    content_3: new FormControl('',[ Validators.required]),
    content_4: new FormControl('',[ Validators.required]),
    is_correct: new FormControl(1),
  });

  constructor(private quiz : QuizService  , private question : QuestionService,   private route: ActivatedRoute , private location: Location) { }

  ngOnInit(): void {
    this.id_quiz = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchQuestion();
  }

  fetchQuestion(){
      this.quiz.getQuiz(this.id_quiz).subscribe(
      (data : any ) => {
          this.questions = data.payload.questions;
          this.id_subject = data.payload.subject_id;
      }
    )
  }
  back(){
    this.location.back();
  }


  storeQuestion() {
    console.log(this.form_question.controls);
    this.question.storeQuestion({
      answers: [
        this.form_question.controls['content_1'].value,
        this.form_question.controls['content_2'].value,
        this.form_question.controls['content_3'].value,
        this.form_question.controls['content_4'].value,
      ],
      is_correct: this.form_question.controls['is_correct'].value,
      name: this.form_question.controls['name'].value,
      quiz_id: this.id_quiz
    }).subscribe(
      (data : any) => {
        this.resetForm();
        this.fetchQuestion();
      }
    )
  }

  updateQuestion(data : any) : any {
    this.dataIdsAnswer = [];
    this.data_update = data;
    var that = this;
    that.flag_form = true;
    data.answers.map(function(data : any , key : any){
      if(data.is_correct == 0 ) that.form_question.controls['is_correct'].setValue(data.id);
      that.dataAnswer[key] = data.id;
      that.dataIdsAnswer.push(data.id);
      that.form_question.controls['content_'+(key+1)].setValue(data.content);
    })
    this.form_question.controls['name'].setValue(data.name);
  }

  editQuestion()
  {
    this.question.updateQuestion({
      answer_id: this.dataIdsAnswer,
      value_answers: [
        this.form_question.controls['content_1'].value,
        this.form_question.controls['content_2'].value,
        this.form_question.controls['content_3'].value,
        this.form_question.controls['content_4'].value,
      ],
      is_correct: this.form_question.controls['is_correct'].value,
      name: this.form_question.controls['name'].value,
    },this.data_update.id).subscribe(
      (data : any ) => {
        this.resetForm();
        this.fetchQuestion();
      },
      (err  : any) => {

      }
    )
  }

  resetForm(){
    this.form_question.controls['content_1'].setValue('');
    this.form_question.controls['content_2'].setValue('');
    this.form_question.controls['content_3'].setValue('');
    this.form_question.controls['content_4'].setValue('');
    this.form_question.controls['is_correct'].setValue(1);
    this.form_question.controls['name'].setValue('');
    this.flag_form = false;
    this.data_update = null;
  }

  deleteQuestion(id : any){
     if (!confirm('Bạn có muốn xóa không !')) return;
    this.question.destroyQuestion(id).subscribe(
      (data : any) => {
        this.fetchQuestion();
      }
    );
  }

}
