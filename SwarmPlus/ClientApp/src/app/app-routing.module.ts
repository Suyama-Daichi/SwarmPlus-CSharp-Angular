import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './common/login/login.component';
import { ToppageComponent } from './page/toppage/toppage.component';
import { AuthGuard } from './service/auth.guard';
import { DayViewComponent } from './fullcalendar/day-view/day-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '*', redirectTo: '' },
  { path: 'top', component: ToppageComponent, canActivate: [AuthGuard] },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'login', component: LoginComponent },
  { path: 'day/:date', component: DayViewComponent },
  { path: 'day', component: DayViewComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
