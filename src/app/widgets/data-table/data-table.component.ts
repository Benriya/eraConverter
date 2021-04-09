import { Component, DoCheck, OnInit } from '@angular/core';
import {EraServiceService} from '../../services/era-service.service';
import {AuthService} from '../../services/auth.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  providers: [EraServiceService],
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements DoCheck, OnInit {
  eraDatas = [];
  listRecord = 50;
  page = 1;
  visible = false;
  filteredPostsList;

  constructor(private eraService: EraServiceService, private authService: AuthService) {
    this.getEraDatas();
  }

  ngOnInit(): void {
    this.filteredPostsList = this.eraDatas;
  }

  ngDoCheck(): void {
    this.visible = this.authService.admin;
  }

  deleteData(deleteData): void {
    if (this.authService.isAuthenticated()) {
      const index = this.eraDatas.indexOf(deleteData, 0);
      this.eraDatas.splice(index, 1);
      this.eraService.postEraData(this.eraDatas).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  getEraDatas() {
    this.eraService.getEraData().pipe(map((data: any) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.eraDatas.push(data[key]);
        }
      }
      return this.eraDatas;
    })).subscribe();
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
