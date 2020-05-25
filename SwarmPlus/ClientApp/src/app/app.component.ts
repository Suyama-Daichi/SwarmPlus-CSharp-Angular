import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleAnalyticsService } from './service/google-analytics.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private gaService: GoogleAnalyticsService) { }
  ngOnInit(): void {
    if (window.location.hostname === 'swarmplus.web.app' ||
      window.location.hostname === 'swarmplus.firebaseapp.com') {
      window.location.href = 'https://swarmplus.net';
    }
    // tracking
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((params: any) => {
        this.gaService.sendPageView(params.url);
      });
  }

  get isLogined() {
    return localStorage.getItem('token');
  }
}
