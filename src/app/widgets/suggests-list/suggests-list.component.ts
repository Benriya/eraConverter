import { Component, OnInit } from '@angular/core';
import {EraServiceService} from "../../services/era-service.service";
import {AuthService} from "../../services/auth.service";
import {map} from "rxjs/operators";
import {eraData} from "../../models/eraData.model";

@Component({
  selector: 'app-suggests-list',
  templateUrl: './suggests-list.component.html',
  styleUrls: ['./suggests-list.component.scss']
})
export class SuggestsListComponent implements OnInit {
  suggestDatas = [];
  eraDatas = [];
  listRecord = 50;
  visible: boolean;
  page = 1;
  filteredPostsList;

  constructor(private eraService: EraServiceService, private authService: AuthService) {
    this.eraService.getSuggestedData().pipe(map((data: any) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.suggestDatas.push(data[key]);
        }
      }
      return this.suggestDatas;
    })).subscribe();

    this.eraService.getEraData().pipe(map((data: any) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.eraDatas.push(data[key]);
        }
      }
      return this.eraDatas;
    })).subscribe();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.visible = true;
    }
    this.filteredPostsList = this.suggestDatas;
  }

  deleteData(deleteData): void {
    if (this.authService.isAuthenticated()) {
      const index = this.suggestDatas.indexOf(deleteData, 0);
      this.suggestDatas.splice(index, 1);
      this.eraService.suggestData(this.suggestDatas).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  postData(data: eraData): void {
    this.deleteData(data);
    this.eraDatas.push(data);
    this.eraService.postEraData(this.eraDatas).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  setPage(page) {
    this.page = page;
  }

  setListRecord(listRecord) {
    this.listRecord = listRecord;
  }

  setSearch(datas) {
    this.filteredPostsList = datas;
  }

}
