import { Component, OnInit } from '@angular/core';
import {EraServiceService} from "../../services/era-service.service";
import {AuthService} from "../../services/auth.service";
import {eraData} from "../../models/eraData.model";
import {GlobalService} from "../../services/global.service";
import {currencyData} from "../../models/currencyData.model";

@Component({
  selector: 'app-suggests-list',
  templateUrl: './suggests-list.component.html',
  styleUrls: ['./suggests-list.component.scss']
})
export class SuggestsListComponent implements OnInit {
  suggestEraDatas = [];
  eraDatas = [];
  suggestCurrDatas = [];
  currencyDatas = [];
  listRecordEra = 50;
  listRecordCurr = 50;
  visible = false;
  pageEra = 1;
  pageCurr = 1;
  filteredPostsListEra;
  filteredPostsListCurr

  constructor(private eraService: EraServiceService, private authService: AuthService, private global: GlobalService) {
    this.global.getSuggestedEraData(this.suggestEraDatas);
    this.global.getEraData(this.eraDatas);
    this.global.getCurrencyData(this.currencyDatas);
    this.global.getSuggestedCurrData(this.suggestCurrDatas);
  }

  ngOnInit(): void {
    if (this.authService.checkIfAdmin()) this.visible = true;
    this.filteredPostsListEra = this.suggestEraDatas;
    this.filteredPostsListCurr = this.suggestCurrDatas;
  }

  deleteEraData(deleteData): void {
    if (this.visible) {
      const index = this.suggestEraDatas.indexOf(deleteData, 0);
      this.suggestEraDatas.splice(index, 1);
      this.eraService.suggestEraData(this.suggestEraDatas).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  postEraData(data: eraData): void {
    this.deleteEraData(data);
    this.eraDatas.push(data);
    this.eraService.postEraData(this.eraDatas).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  deleteCurrData(deleteData): void {
    if (this.visible) {
      const index = this.suggestCurrDatas.indexOf(deleteData, 0);
      this.suggestCurrDatas.splice(index, 1);
      this.eraService.suggestCurrencyData(this.suggestCurrDatas).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  postCurrData(data: currencyData): void {
    this.deleteCurrData(data);
    this.currencyDatas.push(data);
    this.eraService.postCurrencyData(this.currencyDatas).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  setPageEra(page) {
    this.pageEra = page;
  }

  setListRecordEra(listRecord) {
    this.listRecordEra = listRecord;
  }

  setSearchEra(datas) {
    this.filteredPostsListEra = datas;
  }

  setPageCurr(page) {
    this.pageCurr = page;
  }

  setListRecordCurr(listRecord) {
    this.listRecordCurr = listRecord;
  }

  setSearchCurr(datas) {
    this.filteredPostsListCurr = datas;
  }

}
