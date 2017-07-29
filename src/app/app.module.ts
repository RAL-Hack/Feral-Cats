import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LotteryComponent } from './lottery/lottery.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { SelectionComponent } from './selection/selection.component';

import { LotteryService } from './services/lottery.service';
import { SelectionOptionsComponent } from './selection-options/selection-options.component';
import {CatWeekService} from "./services/CatWeek.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LotteryComponent,
    AdminLoginComponent,
    ThankYouComponent,
    SelectionComponent,
    SelectionOptionsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
    LotteryService,
    CatWeekService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
