import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<any> = new Subject<any>();
  mode: string;
  actionCode: string;
  newPassword: string;
  confirmPassword: string;
  actionCodeChecked: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => {
        if (!params) this.router.navigate(['']);

        this.mode = params.mode;
        this.actionCode = params.oobCode;

        switch (params.mode) {
          case 'resetPassword': {
            this.authService
              .getAuth()
              .verifyPasswordResetCode(this.actionCode)
              .then(email => {
                this.actionCodeChecked = true;
              }).catch(e => {
              alert(e);
              this.router.navigate(['/login']);
            });
          } break
          case 'verifyEmail': {
            this.authService.getAuth().applyActionCode(this.actionCode).then(result => {
              this.actionCodeChecked = true;
              this.router.navigate(['/login']);
            }).catch(e => {
              alert(e);
            });
          } break
          default: {
            console.log('query parameters are missing');
            this.router.navigate(['/login']);
          }
        }
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  handleResetPassword() {
    if (this.newPassword != this.confirmPassword) {
      alert('New Password and Confirm Password do not match');
      return;
    }
    this.authService.getAuth().confirmPasswordReset(
      this.actionCode,
      this.newPassword
    )
      .then(resp => {
        alert('New password has been saved');
        this.router.navigate(['/login']);
      }).catch(e => {
      alert(e);
    });
  }

}

