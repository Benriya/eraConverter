import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgForm} from '@angular/forms';
import {ResponsiveService} from "../../services/responsive.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  matCard: string;

  constructor(private authService: AuthService, private responsiveService: ResponsiveService) { }

  ngOnInit(): void {this.responsiveService.getMobileStatus().subscribe( isMobile =>{
    if(isMobile){
      this.matCard = 'mobile';
    }
    else{
      this.matCard = '';
    }
  });
    this.onResize();
  }

  onResize(){
    this.responsiveService.checkWidth();
  }

  onSubmit(form: NgForm): void {
    this.authService.createSession({
      email: form.value.email,
      password: form.value.password
    });
  }

}
