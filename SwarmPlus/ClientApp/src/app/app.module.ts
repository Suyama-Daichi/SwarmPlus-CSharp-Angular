import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MonthSelectorComponent } from './parts/month-selector/month-selector.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Interceptor } from './service/Interceptor/http-interceptors';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserComponent } from './page/user/user.component';
import { TimeStampToDatePipe } from './pipe/time-stamp-to-date.pipe';

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
    MonthSelectorComponent,
    UserComponent,
    TimeStampToDatePipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgbModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularFirestoreModule,
    FullCalendarModule,
    BlockUIModule.forRoot(),
    Ng2FlatpickrModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 0,
        panelClass: 'btn-orange',
        horizontalPosition: 'end'
      }
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CheckinDetailComponent]
})
export class AppModule { }
