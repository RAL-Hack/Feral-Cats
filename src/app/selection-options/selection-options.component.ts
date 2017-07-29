import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {CatWeekService} from "../services/CatWeek.service";

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

  constructor(public fb: FormBuilder, private router: Router, public catWeekService: CatWeekService) { }

  ngOnInit() {
  }

  submitSelections(event) {
    console.log(this.selectionForm.value);
    console.log((Object.keys(this.selectionForm.value).length));
    this.catWeekService.announceCatWeek(this.selectionForm.value);
    this.router.navigate(['/selection']);
  }

  // var y = +x;
}
