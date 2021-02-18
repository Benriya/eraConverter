import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ResponsiveService} from "../../services/responsive.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  title = 'EraConverter';
  isLoggedIn: boolean;
  admin = false;
  onMobile: string;
  onMobileButton: string;
  mobileNavigation: string;

  constructor(public authService: AuthService, private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
      if(isMobile){
        this.onMobile = 'onMobile';
        this.onMobileButton = 'onMobile__button';
        this.mobileNavigation = 'mobileNavigation';
      }
      else{
        this.onMobile = '';
        this.onMobileButton = '';
        this.mobileNavigation = '';
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

}
