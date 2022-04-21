import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url : string = 'http://127.0.0.1:8000/api/'
  constructor(private http: HttpClient) { }

  login(data : any) : Observable<any>{
    return this.http.post(this.url + 'login', {...data});
  }

  logout(data : any) : Observable<any>{
     return this.http.post(this.url + 'logout', {...data},{ headers: this.getHeaderToken() });
  }

  getHistory(data : any , url : any = null): Observable<any>{
     return this.http.post(url ?? (this.url + 'history'), {...data},{ headers: this.getHeaderToken() });
  }

  getHeaderToken() : any{
    const user : any = localStorage.getItem('user');
    let token : any =  JSON.parse(user).token ;
    let headers = new HttpHeaders().set('Authorization',`Bearer ${token}` );
    return headers;
  }
}
