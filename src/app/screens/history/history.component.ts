import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  student_quizs  : any ;
  links  : any ;
  modalFlag: boolean = false;
  student_quiz_details : any ;
  constructor(private user : UserService) { }

  ngOnInit(): void {
    this.fetchHistoryUserQuiz();
  }

  fetchHistoryUserQuiz(url: any = null){
    const userSt  :any = localStorage.getItem('user');
    const user  = JSON.parse(userSt);
    this.user.getHistory(user,url ?? null).subscribe(
      (data : any) => {
        if(!data.status) return alert(data.payload);
        this.student_quizs = data.payload.data;
        this.links = data.payload.links;

      }
    )
  }

  viewHistory(data : any){
    this.modalFlag = true;
    this.student_quiz_details = data;
  }

  perPage(url: any): any {
    if(url) this.fetchHistoryUserQuiz(url);
  }

}
