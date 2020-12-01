import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import * as admin from 'firebase-admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'eraconverter-Web';

  constructor() {}

  ngOnInit(): void {
    /*admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'eraconverter-62594.firebaseapp.com'
    });*/
    firebase.initializeApp({
      apiKey: 'AIzaSyAqUSHFm_xyKLRVhrIvlNiFcbR6oUbUtV8',
      authDomain: 'eraconverter-62594.firebaseapp.com'
    });
  }

}
