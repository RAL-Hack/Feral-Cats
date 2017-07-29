import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css']
})
export class LotteryComponent implements OnInit {
  public lotteryForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    preferredContact: ['', Validators.required],
    monday: [false, Validators.required],
    tuesday: [false, Validators.required],
    wednesday: [false, Validators.required],
    thursday: [false, Validators.required],
    friday: [false, Validators.required]

  });
  constructor(public fb: FormBuilder) { }
  submitLottery(event) {
    //this will display a json object with the form => we need this!!!
    console.log(this.lotteryForm.value);
  }

  ngOnInit() {

  }
}