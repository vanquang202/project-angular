import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  loginForm: FormGroup  = new FormGroup({
    email: new FormControl('' , [Validators.required , Validators.email]),
    password: new FormControl('' , [Validators.required ]),
  });

  constructor() { }

  ngOnInit(): void {

  }

}
