import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ResponsiveService} from "../../services/responsive.service";

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {
  @Input() eraDatas;
  onMobile: string;

  constructor(public authService: AuthService, private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
    this.eraDatas = true;
    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
      if(isMobile){
        this.onMobile = 'mobileView';
      }
      else{
        this.onMobile = '';
      }
    });
    this.onResize();
  }

  onResize(){
    this.responsiveService.checkWidth();
  }

}
