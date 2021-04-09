import { Component, OnInit } from '@angular/core';
import {EraServiceService} from "../../services/era-service.service";
import {AuthService} from "../../services/auth.service";
import {ResponsiveService} from "../../services/responsive.service";
import {map} from "rxjs/operators";
import {GlobalService} from "../../services/global.service";
import {eraData} from "../../models/eraData.model";
import {currencyData} from "../../models/currencyData.model";

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss']
})
export class AddCurrencyComponent implements OnInit {
  admin = false;
  currencyDatas = [];
  suggestDatas = [];
  singleTime = '';
  currencyOne = '';
  currencyTwo = '';
  rate: number;
  missingCurrencyOne = '';
  missingCurrencyTwo = '';
  missingInputRate = '';
  textLine: string;
  selector: string;

  constructor(private eraService: EraServiceService, private authService: AuthService, private responsiveService: ResponsiveService, private globalService: GlobalService) {
    this.eraService.getCurrencyData().pipe(map((data: any) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.currencyDatas.push(data[key]);
        }
      }
      return this.currencyDatas;
    })).subscribe();

    this.eraService.getSuggestedData().pipe(map((data: any) => {
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
    this.globalService.checkIfMobile(this.selector, this.textLine);
  }

  generateId(): number {
    return Math.round(Math.random() * 10000 + 1000);
  }

  postData(data: currencyData): void {
    if (this.currencyTwo !== '' && this.currencyTwo !== '' && this.rate != undefined) {
      this.currencyDatas.push(data);
      this.eraService.postCurrencyData(this.currencyDatas).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }else {
      this.noInputError();
    }
  }

  suggestData(data: currencyData): void {
    if (this.currencyTwo !== '' && this.currencyTwo !== '' && this.rate != undefined) {
      this.suggestDatas.push(data);
      this.eraService.suggestData(this.suggestDatas).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }else {
      this.noInputError();
    }
  }

  noInputError(): void {
    if (this.currencyOne === '') {
      this.missingCurrencyOne = 'missingInput';
    }

    if (this.currencyTwo === '') {
      this.missingCurrencyTwo = 'missingInput';
    }

    if (this.rate === undefined) {
      this.missingInputRate = 'missingInput';
    }
  }



}
