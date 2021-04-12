import {Component, DoCheck, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ResponsiveService} from "../../services/responsive.service";
import { EventEmitter } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  @Output() eraDatasEmitter = new EventEmitter<boolean>();
  @Input() href;
  title = 'EraConverter';
  isLoggedIn: boolean;
  admin = false;
  onMobile: string;
  onMobileButton: string;
  mobileNavigation: string;
  eraDatas = true;
  onMobileTitle: string;

  constructor(public authService: AuthService, private responsiveService: ResponsiveService, private router: Router) { }

  ngOnInit(): void {
    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
      if(isMobile){
        this.onMobile = 'onMobile';
        this.onMobileButton = 'onMobile__button';
        this.mobileNavigation = 'mobileNavigation';
        this.onMobileTitle = "onMobile__title";
      }
      else{
        this.onMobile = '';
        this.onMobileButton = '';
        this.mobileNavigation = '';
        this.onMobileTitle = '';
      }
    });
    this.onResize();
  }

  onResize(){
    this.responsiveService.checkWidth();
  }

  logout(): void {
    this.authService.signOut();
  }

  ngDoCheck(): void {
    this.admin = this.authService.admin;
  }

  changeView() {
    this.eraDatas = !this.eraDatas;
    this.eraDatasEmitter.emit(this.eraDatas);
  }

}
