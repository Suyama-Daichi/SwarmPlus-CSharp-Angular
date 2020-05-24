import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './common/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { DayViewComponent } from './fullcalendar/day-view/day-view.component';
import { MainComponent } from './CommonComponent/main/main.component';
import { UserComponent } from './page/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'month', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'month/:year/:month', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'day/:year/:month/:date', component: DayViewComponent, canActivate: [AuthGuard] },
  { path: 'day', component: DayViewComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'month' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
