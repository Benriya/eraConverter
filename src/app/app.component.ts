import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
/*import * as admin from 'firebase-admin';
import * as serviceAccount from '../../serviceAccountKey.json'*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'eraconverter-Web';

  /*params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
  }*/

  constructor() {}

  ngOnInit(): void {
    /*admin.initializeApp({
      credential: admin.credential.cert(this.params),
      databaseURL: 'eraconverter-62594.firebaseapp.com'
    });*/
    firebase.initializeApp({
      apiKey: 'AIzaSyAqUSHFm_xyKLRVhrIvlNiFcbR6oUbUtV8',
      authDomain: 'eraconverter-62594.firebaseapp.com'
    });
  }

}
