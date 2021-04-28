import {Component, DoCheck, Injectable, OnInit} from '@angular/core';
import {EraServiceService} from '../../services/era-service.service';
import {eraData} from '../../models/eraData.model';
import {AuthService} from "../../services/auth.service";
import {GlobalService} from "../../services/global.service";
import {ResponsiveService} from "../../services/responsive.service";

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  providers: [EraServiceService],
  styleUrls: ['./add-data.component.scss']
})
@Injectable({providedIn: 'root'})
export class AddDataComponent implements OnInit, DoCheck {
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
  quartile = 'first';
  missingInputAge = '';
  missingInputName = '';
  missingInputQuartile = '';
  textLine: string;
  selector: string;
  upload: string;

  constructor(private responsiveService: ResponsiveService, private eraService: EraServiceService, private authService: AuthService, private globalService: GlobalService) {
    this.globalService.getEraData(this.eraDatas);
    this.globalService.getSuggestedEraData(this.suggestDatas);
  }

  ngOnInit(): void {
    this.admin = this.authService.checkIfAdmin();
    this.checkIfMobile();
  }

  ngDoCheck(): void {

  }

  postData(data: eraData): void {
    if (this.name !== '' && this.age !== '') {
      this.eraDatas.push(data);
      this.eraService.postEraData(this.eraDatas).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
      this.setDefault();
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
      this.setDefault();
    }else {
      this.noInputError();
    }
  }

  setDefault() {
    this.eraNames = 'Név';
    this.singleTime = '';
    this.name = '';
    this.age = '';
    this.possessions = '';
    this.income = '';
    this.cost = '';
    this.description = '';
    this.source = '';
    this.quartile = 'first';
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
  setQuartile(selected: string): void {
    this.quartile = selected;
  }

  noInputError(): void {
      if (this.name === '') {
        this.missingInputName = 'missingInput';
      }

      if (this.age === '') {
        this.missingInputAge = 'missingInput';
      }

      if (this.quartile === '') {
        this.missingInputQuartile = 'missingInput';
      }
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
