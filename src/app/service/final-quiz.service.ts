import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinalQuizService {
  url : string = "http://127.0.0.1:8000/api/final-quiz";
  constructor(private http : HttpClient) { }

  passTest(data : any) : Observable<any> {
    return this.http.post(this.url , {...data} , { headers: this.getHeaderToken() });
  }

  getHeaderToken() : any{
    const user : any = localStorage.getItem('user');
    let token : any =  JSON.parse(user).token ;
    let headers = new HttpHeaders().set('Authorization',`Bearer ${token}` );
    return headers;
  }
}
