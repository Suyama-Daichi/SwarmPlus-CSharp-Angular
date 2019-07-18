import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  items: AngularFirestoreCollection<string>;

  constructor(public db: AngularFirestore) {
    this.items = db.collection('users');
  }


  ngOnInit() {
    this.items.doc('eb63c6c5-9591-4436-910c-9e86e6ad17d7').get().subscribe(data => {
      console.log(data.data());
    });
  }
}
