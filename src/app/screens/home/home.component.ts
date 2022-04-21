import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  url: string = 'http://127.0.0.1:8000/api/';
  subjects: any;
  links: any;
  loading: boolean = true;

  constructor(private subject: SubjectService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
    this.fetchList();
  }

  fetchList(url: any = null) {
    this.loading = true;
    this.subject.listSubject(url ?? null).subscribe(
      (data: any) => {
        if (data.status) {
          this.subjects = data.payload.data;
          this.links = data.payload.links;
        } else {
          alert('Server error' + data.payload);
        }
      },
      (err: any) => {},
      () => {
        this.loading = false;
      }
    );
  }

  perPage(url: any): any {
    if (url) this.fetchList(url);
  }
  searchData(e: any): any {
    this.fetchList(this.url + 'subjects?searchsubject=' + e.value);
  }
}
