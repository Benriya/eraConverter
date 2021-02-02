import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

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
