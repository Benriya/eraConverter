import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {eraData} from "../models/eraData.model";

@Injectable({
  providedIn: 'root'
})
export class EraServiceService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  postEraData(postData: any[]): any {
    const token = this.authService.getToken();
    return this.httpClient.put('https://eraconverter-62594.firebaseio.com/eraDatas.json?auth=' + token, postData);
  }

  suggestData(postData: any[]): any {
    const token = this.authService.getToken();
    return this.httpClient.put('https://eraconverter-62594.firebaseio.com/eraDataSuggests.json?auth=' + token, postData);
  }

  onDeleteEraData(deleteData): any {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.delete('https://eraconverter-62594.firebaseio.com/eraDatas.json/' + deleteData, {headers});
  }

  getEraData(): any {
    return this.httpClient.get('https://eraconverter-62594.firebaseio.com/eraDatas.json');
  }

  getSuggestedData(): any {
    return this.httpClient.get('https://eraconverter-62594.firebaseio.com/eraDataSuggests.json');
  }

  postCurrencyData(postData: any[]): any {
    const token = this.authService.getToken();
    return this.httpClient.put('https://eraconverter-62594.firebaseio.com/currencyDatas.json?auth=' + token, postData);
  }

  onDeleteCurrencyData(deleteData): any {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.delete('https://eraconverter-62594.firebaseio.com/currencyDatas.json/' + deleteData, {headers});
  }

  getCurrencyData(): any {
    return this.httpClient.get('https://eraconverter-62594.firebaseio.com/currencyDatas.json');
  }
}
