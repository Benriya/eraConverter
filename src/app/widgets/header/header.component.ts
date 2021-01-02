import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  title = 'EraConverter';
  isLoggedIn: boolean;
  admin = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.signOut();
    window.location.reload();
  }

  ngDoCheck(): void {
    this.admin = this.authService.admin;
  }

}
