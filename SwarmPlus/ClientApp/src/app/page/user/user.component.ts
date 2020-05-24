import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StoreService } from '../../rxjs/store.service';
import { UserInfo } from '../../model/UserInfo.type';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userInfo: UserInfo;
  constructor(public store: StoreService) { }

  ngOnInit() {
    this.setUserInfo();
  }

  setUserInfo() {
    this.store._userInfo$
    .subscribe(
      s => {
        this.userInfo = s;
      }
    );
  }

  return() {
    window.history.back();
  }
}
