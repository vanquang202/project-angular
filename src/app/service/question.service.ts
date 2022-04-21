import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  // url: string = "";
  url: string = "http://127.0.0.1:8000/api/admin/question/";
  constructor(private http: HttpClient) {  }

  storeQuestion(data : any) : Observable<any> {
    return this.http.post<any>(this.url , {...data} , {headers: this.getHeaderToken()});
  }

  updateQuestion(data : any,id : any) : Observable<any>{
     return this.http.put<any>(this.url+id, {...data} , {headers: this.getHeaderToken()});
  }

  destroyQuestion(id : any) : Observable<any> {
    return this.http.delete<any>(this.url + id ,  {headers: this.getHeaderToken()});
  }

  getHeaderToken() : any{
    const user : any = localStorage.getItem('user');
    let token : any =  JSON.parse(user).token ;
    let headers = new HttpHeaders().set('Authorization',`Bearer ${token}` );
    return headers;
  }

}
