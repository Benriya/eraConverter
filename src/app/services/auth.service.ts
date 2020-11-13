import { AuthData } from '../Models/auth-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseModel } from '../Models/authResponse.model';
import firebase from "firebase";


@Injectable({providedIn: 'root'})
export class AuthService {
  user = false;
  token: string;

  constructor(private httpClient: HttpClient, private router: Router) {}

  signUp(authData: AuthData) {
    firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
      .catch(err =>{
      console.log(err);
    })
  }

  signIn(authData: AuthData) {
    firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
      .then(response =>{
        this.router.navigate(['']);
        firebase.auth().currentUser.getIdToken()
          .then(
          (token: string) => this.token = token
        )
      console.log(response);
    })
      .catch(err =>{
      console.log(err);
    })
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  /*signUp(authData: AuthData) {
    return this.httpClient.post<AuthResponseModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXjiW8-asoyQAMob_llGziEEnkl4gWXkE',
      authData
    );
  }

  login(authData: AuthData) {
    return this.httpClient.post<AuthResponseModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXjiW8-asoyQAMob_llGziEEnkl4gWXkE',
      authData);
  }*/

  signOut() {
    firebase.auth().signOut();
    this.token = null;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
