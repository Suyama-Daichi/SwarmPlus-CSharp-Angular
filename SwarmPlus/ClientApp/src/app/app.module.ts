import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginComponent } from './common/login/login.component';
import { ToppageComponent } from './page/toppage/toppage.component';
import { AuthGuard } from './service/auth.guard';
import { MonthViewComponent } from './fullcalendar/month-view/month-view.component';
import { DayViewComponent } from './fullcalendar/day-view/day-view.component';
import { CheckinDetailComponent } from './common/checkin-detail/checkin-detail.component';
import { DatePipe } from './pipe/date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    ToppageComponent,
    MonthViewComponent,
    DayViewComponent,
    CheckinDetailComponent,
    DatePipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularFirestoreModule,
    FullCalendarModule,
    BlockUIModule.forRoot(),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [CheckinDetailComponent]
})
export class AppModule { }
