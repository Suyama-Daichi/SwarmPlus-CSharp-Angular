import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { HttpService } from '../service/http.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  /** バックエンドAPI */
  backendAPI = environment.backEndApi;

  items: AngularFirestoreCollection<string>;

  constructor(public db: AngularFirestore, private httpService: HttpService) {
    this.items = db.collection('users');
  }


  ngOnInit() {
  }
}
