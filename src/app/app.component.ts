import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import {ResponsiveService} from "./services/responsive.service";
/*import * as admin from 'firebase-admin';
import * as serviceAccount from '../../serviceAccountKey.json'*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'eraconverter-Web';

  constructor(private responsiveService: ResponsiveService){
  }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyAqUSHFm_xyKLRVhrIvlNiFcbR6oUbUtV8',
      authDomain: 'eraconverter-62594.firebaseapp.com'
    });

    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
      if(isMobile){
        console.log('Mobile device detected')
      }
      else{
        console.log('Desktop detected')
      }
    });
    this.onResize();
  }

  onResize(){
    this.responsiveService.checkWidth();
  }

}
