import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  url: string = "http://127.0.0.1:8000/api/subjects";
  urlAdmin: string = "http://127.0.0.1:8000/api/admin/subject/";
  constructor(private http: HttpClient) {  }

  listSubject(url : any = null):  Observable<any> {
    return this.http.get<any>(url ?? this.url);
  }

  showSubject(id : any):  Observable<any> {
    return this.http.get<any>(this.url+"/"+id);
  }

  listSubjectAdmin(url : any = null):  Observable<any> {
    return this.http.get<any>(url ?? this.urlAdmin);
  }

  storeSubjectAdmin(data : any = null): Observable<any> {
      return this.http.post<any>(this.urlAdmin, {...data},{ headers: this.getHeaderToken() });
  }

  updateSubjectAdmin(id: any ,data : any = null): Observable<any> {
      return this.http.put<any>(this.urlAdmin+id, {...data},{ headers: this.getHeaderToken() });
  }

  deleteSubject(id: string): Observable<any>{
    return this.http.delete<any>(this.urlAdmin+id);
  }

  getHeaderToken() : any{
    const user : any = localStorage.getItem('user');
    let token : any =  JSON.parse(user).token ;
    let headers = new HttpHeaders().set('Authorization',`Bearer ${token}` );
    return headers;
  }
}
