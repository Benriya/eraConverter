import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  resetPassword(form: NgForm) {
    console.log(form.value.email);
    if (form.value.email == '') {
      alert('Type in your email first');
    }
    this.authService.resetPasswordInit(form.value.email)
      .then(
        () => alert('A password reset link has been sent to your email' +
          'address'),
        (rejectionReason) => alert(rejectionReason))
      .catch(e => alert('An error occurred while attempting to reset' +
        'your password'));
  }

}
