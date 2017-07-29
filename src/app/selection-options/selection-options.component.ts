import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-selection-options',
  templateUrl: './selection-options.component.html',
  styleUrls: ['./selection-options.component.css']
})
export class SelectionOptionsComponent implements OnInit {
  public selectionForm = this.fb.group({
    monday: [0, Validators.required],
    tuesday: [0, Validators.required],
    wednesday: [0, Validators.required],
    thursday: [0, Validators.required],
    friday: [0, Validators.required]
  })

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.randomNum(50, 5));
  }

  randomNum(fileSize, appointmentSlots) {
    return Math.floor(Math.random() * (fileSize - 1 + 1)) + 1;
  }

  submitSelections(event) {
    console.log(this.selectionForm.value);
    console.log((Object.keys(this.selectionForm.value).length))

  }

  // var y = +x;
}
