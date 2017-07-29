import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class CatWeekService {
  private CatWeekSubject = new BehaviorSubject<any>(1);

  catWeekAnnounced$ = this.CatWeekSubject.asObservable();

  announceCatWeek(catWeek: any){
    this.CatWeekSubject.next(catWeek);
  }
}
