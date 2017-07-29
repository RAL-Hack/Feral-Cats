import {Component, OnInit} from '@angular/core';
import {S3} from 'aws-sdk';
import {CatWeekService} from "../services/CatWeek.service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  catWeek: any;
  subscription: Subscription;
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday:any;
  mondayWinners = [];
  tuesdayWinners = [];
  wednesdayWinners = [];
  thursdayWinners = [];
  fridayWinners = [];


  constructor(public catWeekService: CatWeekService) {
    this.subscription = this.catWeekService.catWeekAnnounced$.subscribe(
      cW => this.catWeek = cW
    );
  }

  public registrants;
  selected = [];

  ngOnInit() {
    let s3Entries = this.getEntriesFromS3();
    let select = this;
    s3Entries.then(function (data) {
      let registrants = JSON.parse(data.toString())['registrants'];
      console.log(registrants);
      select.sortRegistrantsByDay(registrants);
    });

  }

  sortRegistrantsByDay(registrants){
    this.monday = this.getRegistrantsByDay(registrants, 'monday');
    this.tuesday = this.getRegistrantsByDay(registrants, 'tuesday');
    this.wednesday = this.getRegistrantsByDay(registrants, 'wednesday');
    this.thursday = this.getRegistrantsByDay(registrants, 'thursday');
    this.friday = this.getRegistrantsByDay(registrants, 'friday');
    this.assignLotteryWinners();
  }

  randomNum(availableRegistrants) {
    return Math.floor(Math.random() * (availableRegistrants));
  }

  assignLotteryWinners(){
    while (this.mondayWinners.length != this.catWeek['monday']){
      let winner = this.monday[this.randomNum(this.monday.length)];
      this.mondayWinners.push(winner);
      this.selected.push(winner['firstName']);
    }
    while (this.tuesdayWinners.length != this.catWeek['tuesday']){
      let winner = this.tuesday[this.randomNum(this.tuesday.length)];
      this.tuesdayWinners.push(winner);
      this.selected.push(winner['firstName']);
    }
    while (this.wednesdayWinners.length != this.catWeek['wednesday']){
      let winner = this.wednesday[this.randomNum(this.wednesday.length)];
      this.wednesdayWinners.push(winner);
      this.selected.push(winner['firstName']);
    }
    while (this.thursdayWinners.length != this.catWeek['thursday']){
      let winner = this.thursday[this.randomNum(this.thursday.length)];
      this.thursdayWinners.push(winner);
      this.selected.push(winner['firstName']);
    }
    while (this.fridayWinners.length != this.catWeek['friday']){
      let winner = this.friday[this.randomNum(this.friday.length)];
      this.fridayWinners.push(winner);
      this.selected.push(winner['firstName']);
    }
    console.log(this.mondayWinners);
    console.log(this.tuesdayWinners);
    console.log(this.wednesdayWinners);
    console.log(this.thursdayWinners);
    console.log(this.fridayWinners);
  }

  getEntriesFromS3() {
    return new Promise((resolve, reject) => {
      let s3 = new S3({
        accessKeyId:'AKIAJSHBTMQLB3633NIA',
        secretAccessKey: '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'
      });
      s3.getObject({
        Bucket: 'aws-website-feralcatlottery-kq696',
        Key: 'MOCK_DATA.json'
      }, function (err, data) {
        if (err) {
          console.log("error");
          reject(err);
        }
        else
          var body = data.Body.toString();
          resolve(body);
      });
    })
  }

  getRegistrantsByDay(registrants, day){
    let result = [];
    registrants.forEach(function (registrant) {
      if (registrant[day]) {
        result.push(registrant);
      }
    });
    console.log(result);
    return result;
  }
}
