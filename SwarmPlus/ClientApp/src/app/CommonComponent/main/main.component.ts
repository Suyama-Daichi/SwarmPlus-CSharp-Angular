import { Component, OnInit } from '@angular/core';
import { Threshold } from '../../const';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isMobile: boolean = window.innerWidth <= Threshold.SMARTPHONE_WIDTH;
  constructor() { }

  ngOnInit() { }

}
