import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { LoginComponent } from './common/login/login.component';
import { ToppageComponent } from './page/toppage/toppage.component';
import { AuthGuard } from './service/auth.guard';
import { MonthViewComponent } from './fullcalendar/month-view/month-view.component';
import { DayViewComponent } from './fullcalendar/day-view/day-view.component';
import { CheckinDetailComponent } from './modal/checkin-detail/checkin-detail.component';
import { defaultSimpleModalOptions } from 'ngx-simple-modal/dist/simple-modal/simple-modal-options';


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
    CheckinDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FullCalendarModule,
    BlockUIModule.forRoot(),
    SimpleModalModule.forRoot({ container: 'modal-container' }, {
      ...defaultSimpleModalOptions, ...{
        closeOnClickOutside: true
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [CheckinDetailComponent]
})
export class AppModule { }
