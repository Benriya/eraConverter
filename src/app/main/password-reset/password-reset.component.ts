import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ResponsiveService} from '../../services/responsive.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  matCard: string;

  constructor(private authService: AuthService, private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
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
