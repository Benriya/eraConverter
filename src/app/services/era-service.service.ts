import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { map } from "rxjs/operators";
import { eraData } from "../models/eraData.model";

@Injectable({
  providedIn: 'root'
})
export class EraServiceService {

  constructor(private httpClient: HttpClient) { }

  postEraData(postData: any[]) {
    return this.httpClient.put('https://eraconverter-62594.firebaseio.com/eraDatas.json', postData);
  }

  /*getBuyList(array: Array<eraData>) {
    this.httpClient.get('https://eraconverter-62594.firebaseio.com/').pipe(map(data => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          array.push(data[key]);
        }
      }
      return array;
    })).subscribe();
  }*/

  onDelete(deleteData) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.delete('https://eraconverter-62594.firebaseio.com/eraDatas.json/' + deleteData, {headers: headers});
  }

  getEraData(array: Array<eraData>) {
    this.httpClient.get('https://eraconverter-62594.firebaseio.com/eraDatas.json').pipe(map(data => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          array.push(data[key]);
        }
      }
      return array;
    })).subscribe();
  }
}
