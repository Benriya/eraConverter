import {Component, Injectable, OnInit} from '@angular/core';
import {EraServiceService} from '../../services/era-service.service';
import {eraData} from '../../models/eraData.model';
import {map} from 'rxjs/operators';
import {AuthService} from "../../services/auth.service";
import {ResponsiveService} from "../../services/responsive.service";
import {GlobalService} from "../../services/global.service";

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
  quartile = '';
  missingInputAge = '';
  missingInputName = '';
  missingInputQuartile = '';
  textLine: string;
  selector: string;

  constructor(private eraService: EraServiceService, private authService: AuthService, private globalService: GlobalService) {
    this.globalService.getEraData(this.eraDatas);
    this.globalService.getSuggestedEraData(this.suggestDatas);
  }

  ngOnInit(): void {
    this.admin = this.authService.isAuthenticated();
    this.globalService.checkIfMobile(this.selector, this.textLine);
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

      if (this.quartile === '') {
        this.missingInputQuartile = 'missingInput';
      }
  }

}
