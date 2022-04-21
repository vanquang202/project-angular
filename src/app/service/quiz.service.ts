import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  url: string = "http://127.0.0.1:8000/api/quizs/";
  urlAdmin: string = "http://127.0.0.1:8000/api/admin/quiz/"
   constructor(private http: HttpClient) {  }

  getQuiz(id : any ): Observable<any>{
    return this.http.get<any>(this.url+id);
  }

  getQuizAdmin(url : any = null , id : any ): Observable<any>{
    return this.http.get<any>(url ?? this.urlAdmin+id);
  }

  storeQuizAdmin(data : any = null): Observable<any> {
      return this.http.post<any>(this.urlAdmin, {...data},{ headers: this.getHeaderToken() });
  }

  updateQuizAdmin(id: any ,data : any = null): Observable<any> {
      return this.http.put<any>(this.urlAdmin+id, {...data},{ headers: this.getHeaderToken() });
  }

  deleteQuiz(id: string): Observable<any>{
    return this.http.delete<any>(this.urlAdmin+id,{ headers: this.getHeaderToken() });
  }

  unStatus(id : any): Observable<any>{
    return this.http.post<any>(this.urlAdmin+"un-status/"+id,{ headers: this.getHeaderToken() });
  }

  reStatus(id : any): Observable<any>{
    return this.http.post<any>(this.urlAdmin+"re-status/"+id,{ headers: this.getHeaderToken() });
  }

   getHeaderToken() : any{
    const user : any = localStorage.getItem('user');
    let token : any =  JSON.parse(user).token ;
    let headers = new HttpHeaders().set('Authorization',`Bearer ${token}` );
    return headers;
  }
}
