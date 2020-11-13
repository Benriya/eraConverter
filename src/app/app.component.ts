import {Component, OnInit} from '@angular/core';
import { EraServiceService } from "./services/era-service.service";
import firebase from "firebase";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'eraconverter-Web';

  constructor() {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAqUSHFm_xyKLRVhrIvlNiFcbR6oUbUtV8",
      authDomain: "eraconverter-62594.firebaseapp.com"
    })
  }

}
