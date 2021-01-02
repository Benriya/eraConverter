import {Component, Injectable, OnInit} from '@angular/core';
import {EraServiceService} from '../../services/era-service.service';
import {eraData} from '../../models/eraData.model';
import {map} from 'rxjs/operators';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  providers: [EraServiceService],
  styleUrls: ['./add-data.component.scss']
})
@Injectable({providedIn: 'root'})
export class AddDataComponent implements OnInit {
  admin = false;
  eraDatas = [];
  suggestDatas = [];
  eraNames = 'Név';
  singleTime = '';
  name = '';
  age = '';
  possessions = '';
  income = '';
  cost = '';
  description = '';
  source = '';
  missingInputAge = '';
  missingInputName = '';

  constructor(private eraService: EraServiceService, private authService: AuthService) {
    this.eraService.getEraData().pipe(map((data: any) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.eraDatas.push(data[key]);
        }
      }
      return this.eraDatas;
    })).subscribe();

    this.eraService.getSuggestedEraData().pipe(map((data: any) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.suggestDatas.push(data[key]);
        }
      }
      return this.suggestDatas;
    })).subscribe();
  }

  ngOnInit(): void {
    this.admin = this.authService.admin;
    console.log(this.admin);
  }

  postData(data: eraData): void {
    if (this.name !== '' && this.age !== '') {
      this.eraDatas.push(data);
      this.eraService.postEraData(this.eraDatas).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }else {
      this.noInputError();
    }
  }

  suggestData(data: eraData): void {
    if (this.name !== '' && this.age !== '') {
      this.suggestDatas.push(data);
      this.eraService.suggestEraData(this.suggestDatas).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }else {
      this.noInputError();
    }
  }

  generateId(): number {
    return Math.round(Math.random() * 10000 + 1000);
  }

  setEraName(selected: string): void {
    this.eraNames = selected;
  }
  setSingleTime(selected: string): void {
    this.singleTime = selected;
  }

  noInputError(): void {
      if (this.name === '') {
        this.missingInputName = 'missingInput';
      }

      if (this.age === '') {
        this.missingInputAge = 'missingInput';
      }
  }

}
