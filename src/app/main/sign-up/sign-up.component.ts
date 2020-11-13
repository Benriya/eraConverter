import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signedUp: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signedUp = false;
  }
  onSubmit(form: NgForm) {
    this.authService.signUp({
      email: form.value.email,
      password: form.value.password
    });
    this.signedUp = true;
    //this.authService.setUser();
    /*).subscribe(resData => {

      console.log(resData);
    });*/
  }
}
