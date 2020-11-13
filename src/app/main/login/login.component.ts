import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.authService.signIn({
      email: form.value.email,
      password: form.value.password
    });
    //this.authService.setUser();
  }

}