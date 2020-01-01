import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isMobile: boolean = window.innerWidth < 768;
  constructor() { }

  ngOnInit() { }

}
