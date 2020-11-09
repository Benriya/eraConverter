import { Component, OnInit } from '@angular/core';
import {EraServiceService} from "../../services/era-service.service";

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  providers: [EraServiceService],
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  eraDatas = [];
  name = '';
  age: '';
  possessions: '';
  income: '';
  cost: '';
  description: '';
  source: ';'

  constructor(private eraService: EraServiceService) { }

  ngOnInit(): void {
    this.eraService.getEraData(this.eraDatas);
  }


  postData(data) {
    this.eraDatas.push(data);
    console.log('button pushed: ' + data);
    this.eraService.postEraData(this.eraDatas).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  generateId() {
    return Math.round(Math.random() * 100000);
  }

}
