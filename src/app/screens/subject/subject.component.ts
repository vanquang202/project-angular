import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  subjects: any = [];
  links: any = [];
  flag_form: boolean = false;
  data_update: any = null;
  form_subject: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(private subject: SubjectService) {}

  ngOnInit(): void {
    this.fetchSubjects();
  }

  fetchSubjects(url: any = null): void {
    this.subject.listSubjectAdmin(url ?? null).subscribe((data: any) => {
      this.subjects = data.payload.data;
      this.links = data.payload.links;
    });
  }
  perPage(url: any): any {
    if (url) this.fetchSubjects(url);
  }

  storeSubject() {
    const user: any = localStorage.getItem('user');

    this.subject
      .storeSubjectAdmin({
        name: this.form_subject.controls['name'].value,
        email: JSON.parse(user).user['email'],
      })
      .subscribe((data: any) => {
        if (!data.status) return alert(data.payload);
        this.fetchSubjects();
      });
  }

  editSubject(data: any) {
    this.data_update = data;
    this.form_subject.controls['name'].setValue(data.name);
    this.flag_form = true;
  }

  updateSubject() {
    this.subject
      .updateSubjectAdmin(this.data_update.id, {
        name: this.form_subject.controls['name'].value,
      })
      .subscribe(
        (data: any) => {
          this.data_update = null;
          this.form_subject.controls['name'].setValue('');
          this.flag_form = false;
          this.fetchSubjects();
        },
        (err: any) => {
          alert('Kông thể cập nhật môn học !');
        }
      );
  }

  deleteSubject(id: any) {
    if (!confirm('Bạn có muốn xóa không !')) return;
    this.subject.deleteSubject(id).subscribe(
      (data: any) => {
        this.fetchSubjects();
      },
      (err: any) => {
        alert('Không thể xóa môn học !');
      }
    );
  }
}
