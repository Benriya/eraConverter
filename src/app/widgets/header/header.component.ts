import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck, OnInit {
  title = 'EraConverter';
  isLoggedIn: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
  }

  logout() {
    this.authService.signOut();
    window.location.reload();
  }

}
