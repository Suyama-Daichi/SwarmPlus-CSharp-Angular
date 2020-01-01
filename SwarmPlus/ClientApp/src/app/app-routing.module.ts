import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './common/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { DayViewComponent } from './fullcalendar/day-view/day-view.component';
import { MainComponent } from './CommonComponent/main/main.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '*', redirectTo: '' },
  { path: 'top', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'top/:year/:month', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'day/:year/:month/:date', component: DayViewComponent, canActivate: [AuthGuard] },
  { path: 'day', component: DayViewComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
