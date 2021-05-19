import { Component, OnInit } from '@angular/core';
import {EraServiceService} from "../../services/era-service.service";
import {AuthService} from "../../services/auth.service";
import {ResponsiveService} from "../../services/responsive.service";
import {GlobalService} from "../../services/global.service";
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
  currencyOne = '';
  currencyTwo = '';
  rate: number;
  rateTwo: number;
  missingCurrencyOne = '';
  missingCurrencyTwo = '';
  missingInputRate = '';
  textLine: string;
  selector: string;

  constructor(private eraService: EraServiceService, private authService: AuthService, private responsiveService: ResponsiveService, private globalService: GlobalService) {
    this.globalService.getCurrencyData(this.currencyDatas);
    this.globalService.getSuggestedCurrData(this.suggestDatas);
  }

  ngOnInit(): void {
    this.admin = this.authService.checkIfAdmin();
    this.checkIfMobile();
  }

  generateId(): number {
    return Math.round(Math.random() * 10000 + 1000);
  }

  postData(data: currencyData, data2:currencyData): void {
    if (this.currencyTwo !== '' && this.currencyTwo !== '' && this.rate != undefined && this.rateTwo != undefined) {
      this.pushCurrencyDatas(data);
      this.pushCurrencyDatas(data2);
      this.uploadPostData();
    }else {
      this.noInputError();
    }
  }

  suggestData(data: currencyData, data2:currencyData): void {
    if (this.currencyTwo !== '' && this.currencyTwo !== '' && this.rate != undefined && this.rateTwo != undefined) {
      this.pushSCurrencyDatas(data);
      this.pushSCurrencyDatas(data2);
      this.uploadSuggestData();
    }else {
      this.noInputError();
    }
  }

  pushSCurrencyDatas(data) {
    this.suggestDatas.push(data);
  }

  pushCurrencyDatas(data) {
    this.currencyDatas.push(data);
  }

  uploadSuggestData() {
    this.eraService.suggestCurrencyData(this.suggestDatas).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  uploadPostData() {
    this.eraService.postCurrencyData(this.currencyDatas).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  noInputError(): void {
    if (this.currencyOne === '') {
      this.missingCurrencyOne = 'missingInput';
    }

    if (this.currencyTwo === '') {
      this.missingCurrencyTwo = 'missingInput';
    }

    if (this.rate === undefined || this.rateTwo === undefined) {
      this.missingInputRate = 'missingInput';
    }
  }

  setDefault() {
    this.currencyOne = '';
    this.currencyTwo = '';
    this.rate = 0;
    this.rateTwo = 0;
  }

  checkIfMobile() {
    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
      if(isMobile){
        this.selector = 'mobileSelector';
        this.textLine = 'mobileTextLine';
      }
      else{
        this.selector = '';
        this.textLine = '';
      }
    });
    this.onResize();
  }

  onResize(){
    this.responsiveService.checkWidth();
  }
}
