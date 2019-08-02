import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap
    .subscribe((params: ParamMap) => {
      const queryParam = this.route.snapshot.queryParamMap.get('code');
      console.log(queryParam);
    });
  }

}
