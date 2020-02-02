import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  thisTimeLastYearPath: string;

  constructor(private router: Router) { }
  isExpanded = false;

  ngOnInit() {
    this.thisTimeLastYearPath = `/day/${moment().subtract(1, 'year').format('YYYY/MM/DD')}`;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }
}
