import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ResponsiveService} from "../../services/responsive.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signedUp: boolean;
  matCard: string;

  constructor(private authService: AuthService, private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
    this.signedUp = false;
    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
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
    this.authService.signUp({
      email: form.value.email,
      password: form.value.password
    });
    this.signedUp = true;
  }

  isPasswordSame(form: NgForm) {
    return form.value.password === form.value.confirmPassword;
  }
}
