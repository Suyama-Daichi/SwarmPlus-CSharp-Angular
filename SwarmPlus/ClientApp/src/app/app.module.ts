import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './common/nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginComponent } from './common/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { MonthViewComponent } from './fullcalendar/month-view/month-view.component';
import { DayViewComponent } from './fullcalendar/day-view/day-view.component';
import { CheckinDetailComponent } from './common/checkin-detail/checkin-detail.component';
import { DateJPPipe } from './pipe/date-jp.pipe';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { StringJoinPipe } from './pipe/string-join.pipe';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { MainComponent } from './CommonComponent/main/main.component';
import { ListViewComponent } from './fullcalendar/list-view/list-view.component';
import { DateSelectorComponent } from './parts/date-selector/date-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    MonthViewComponent,
    DayViewComponent,
    CheckinDetailComponent,
    DateJPPipe,
    SidebarComponent,
    StringJoinPipe,
    MainComponent,
    ListViewComponent,
    DateSelectorComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularFirestoreModule,
    FullCalendarModule,
    BlockUIModule.forRoot(),
    Ng2FlatpickrModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [CheckinDetailComponent]
})
export class AppModule { }
