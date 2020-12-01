import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EraServiceService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  postEraData(postData: any[]): any {
    const token = this.authService.getToken();
    return this.httpClient.put('https://eraconverter-62594.firebaseio.com/eraDatas.json?auth=' + token, postData);
  }

  onDelete(deleteData): any {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.delete('https://eraconverter-62594.firebaseio.com/eraDatas.json/' + deleteData, {headers});
  }

  getEraData(): any {
    return this.httpClient.get('https://eraconverter-62594.firebaseio.com/eraDatas.json');
  }
}
