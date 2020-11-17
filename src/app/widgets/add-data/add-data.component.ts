import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {EraServiceService} from "../../services/era-service.service";
import {eraData} from "../../models/eraData.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  providers: [EraServiceService],
  styleUrls: ['./add-data.component.scss']
})
@Injectable({providedIn: 'root'})
export class AddDataComponent implements OnInit {
  eraDatas = [];
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

  constructor(private eraService: EraServiceService) {
    this.eraService.getEraData().pipe(map(data => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.eraDatas.push(data[key]);
        }
      }
      return this.eraDatas;
    })).subscribe();
  }

  ngOnInit(): void {
  }

  postData(data: eraData) {
    console.log(this.name);
    console.log(this.age);
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

  generateId() {
    return Math.round(Math.random() * 10000 + 1000);
  }

  setEraName(selected: string) {
    this.eraNames = selected;
  }
  setSingleTime(selected: string) {
    this.singleTime = selected;
  }

  noInputError() {
      if (this.name === '') {
        this.missingInputName = 'missingInput';
      }

      if (this.age === '') {
        this.missingInputAge = 'missingInput';
      }
  }

}
