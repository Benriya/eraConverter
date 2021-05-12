import {Component, DoCheck, OnInit} from '@angular/core';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import {ResponsiveService} from './services/responsive.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'eraconverter-Web';
  mobile = false;
  dataTypeEra: boolean;
  href: string;

  constructor(private route: ActivatedRoute, private responsiveService: ResponsiveService, private router: Router){
  }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyAqUSHFm_xyKLRVhrIvlNiFcbR6oUbUtV8',
      authDomain: 'eraconverter-62594.firebaseapp.com'
    });

    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
      if(isMobile){
        this.mobile = true;
        console.log('Mobile detected')
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

  ngDoCheck(): void {
    this.href = this.router.url;
  }

  dataType(value: boolean) {
    this.dataTypeEra = value;
  }

}
