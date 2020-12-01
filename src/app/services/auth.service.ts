import { AuthData } from '../Models/auth-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Injectable({providedIn: 'root'})
export class AuthService {
  user = false;
  token: string;
  uid: string;

  constructor(private httpClient: HttpClient, private router: Router) {}

  SendVerificationMail(): any {
    return firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }


  signUp(authData: AuthData): void {
    firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
      this.SendVerificationMail();
    })
      .catch(err => {
      console.log(err);
    });
  }

  signIn(authData: AuthData): void {
    firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
      .then(response => {
        if (response.user.emailVerified !== true) {
          this.SendVerificationMail();
          window.alert('Please validate your email address. Kindly check your inbox.');
        } else {
          this.uid = response.user.uid;
          this.router.navigate(['']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                console.log(firebase.auth());
                this.token = token; }
            );
        }
        console.log(response);
    })
      .catch(err => {
      console.log(err);
    });
  }

  resetPasswordInit(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  getAuth() {
    return firebase.auth();
  }

  getToken(): string {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  signOut(): void {
    firebase.auth().signOut();
    this.token = null;
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }
}
