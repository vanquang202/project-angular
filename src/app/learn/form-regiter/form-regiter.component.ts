import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors , ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-regiter',
  templateUrl: './form-regiter.component.html',
  styleUrls: ['./form-regiter.component.css']
})
export class FormRegiterComponent implements OnInit {

  formRegister: FormGroup = new FormGroup({
    name: new FormControl('' , [Validators.required]),
    email: new FormControl('' , [Validators.required , Validators.email]),
    password: new FormControl('' , [Validators.required  ]),
    confirm_password: new FormControl('' , [Validators.required  ]),
    date: new FormControl('' , [Validators.required ,  ]),
  })

  conFirmed( ortherValue : string ) :  ValidatorFn{
    return (control : AbstractControl) : ValidationErrors | null => {
      console.log(control.value , ortherValue);

       return (control.value !== ortherValue) ? { 'confirmed': true } : null;
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.formRegister.controls['confirm_password'].valueChanges.subscribe(
      (data: any) => {
        this.formRegister.controls['confirm_password'].addValidators([
          this.conFirmed(this.formRegister.controls['password'].value)
        ]);
      }
    )
  }

}
