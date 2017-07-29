import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LotteryComponent } from './lottery/lottery.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

export const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'admin-login', component: AdminLoginComponent},
  { path: 'thank-you', component: ThankYouComponent},
  { path: 'lottery', component: LotteryComponent},
  { path: '**', component: HomeComponent }
];
