import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../service/store.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    console.log(this.store);
  }

}
