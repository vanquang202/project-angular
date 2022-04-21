import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() student_quiz_details : any;
  @Output() close : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  closeModal(){
    this.close.emit();
  }

  ngOnInit(): void {
  }

}
