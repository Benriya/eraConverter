import { AuthData } from '../Models/auth-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseModel } from '../Models/authResponse.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  user = false;

  constructor(private httpClient: HttpClient, private router: Router) {}

  signUp(authData: AuthData) {
    return this.httpClient.post<AuthResponseModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBF7IpBFlT2Xg8ya9XMNArvaKjnrdqguTE',
      authData
    );
  }

  login(authData: AuthData) {
    return this.httpClient.post<AuthResponseModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBF7IpBFlT2Xg8ya9XMNArvaKjnrdqguTE',
      authData);
  }

  async logout() {
    this.user = false;
    await this.router.navigate(['/login']);
    window.location.reload();
  }

  async setUser() {
    this.user = true;
    await this.router.navigate(['/home']);
    window.location.reload();
  }
}
