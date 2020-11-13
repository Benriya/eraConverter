import { Component, OnInit } from '@angular/core';
import {EraServiceService} from "../../services/era-service.service";
import {eraData} from "../../models/eraData.model";

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  providers: [EraServiceService],
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  eraDatas = [];
  eraNames = 'Név';
  singleTime = '';
  name: string;
  age: string;
  possessions: string;
  income: string;
  cost: string;
  description: string;
  source: string;
  missingInputAge = '';
  missingInputName = '';

  constructor(private eraService: EraServiceService) { }

  ngOnInit(): void {
    this.eraService.getEraData(this.eraDatas);
  }


  postData(data: eraData) {
    console.log(this.name);
    console.log(this.age);
    if (this.name !== undefined && this.age !== undefined) {
      this.eraDatas.push(data);
      console.log('button pushed: ' + data);
      this.eraService.postEraData(this.eraDatas).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }else {
      this.noInputError();
    }
  }

  generateId() {
    return Math.round(Math.random() * 100000);
  }

  setEraName(selected: string) {
    this.eraNames = selected;
  }
  setSignleTime(selected: string) {
    this.singleTime = selected;
  }

  noInputError() {
      if (this.name === undefined) {
        this.missingInputName = 'missingInput';
      }

      if (this.age === undefined) {
        this.missingInputAge = 'missingInput';
      }
  }

}
