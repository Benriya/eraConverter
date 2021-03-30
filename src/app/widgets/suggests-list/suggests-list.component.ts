import { Component, OnInit } from '@angular/core';
import {EraServiceService} from "../../services/era-service.service";
import {AuthService} from "../../services/auth.service";
import {map} from "rxjs/operators";
import {eraData} from "../../models/eraData.model";
import {GlobalService} from "../../services/global.service";
import {ResponsiveService} from "../../services/responsive.service";

@Component({
  selector: 'app-suggests-list',
  templateUrl: './suggests-list.component.html',
  styleUrls: ['./suggests-list.component.scss']
})
export class SuggestsListComponent implements OnInit {
  suggestDatas = [];
  eraDatas = [];
  page: number;
  pages = [];
  listRecordNumber = 50;
  activePage = 1;
  visible = false;
  listSize = 0;
  filteredPostsList;
  searchOption: string;
  pagination: string;

  constructor(private eraService: EraServiceService, private authService: AuthService, private responsiveService: ResponsiveService, private globalService: GlobalService) {
    this.eraService.getSuggestedEraData().pipe(map((data: any) => {
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
    console.log(this.filteredPostsList);
    this.page = 1;
    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
      if(isMobile){
        this.pagination = 'pagination';
      }
      else{
        this.pagination = 'pagination pagination-lg';
      }
    });
    this.onResize();
  }

  onResize(){
    this.responsiveService.checkWidth();
  }

  ngDoCheck(): void {
    this.setPaginator();
  }

  filterOptions() {
    this.filteredPostsList = this.globalService.filteredListOptions(this.filteredPostsList, this.searchOption, this.suggestDatas);
  }

  resetSearch(): void {
    this.filteredPostsList = this.suggestDatas;
    this.searchOption = '';
  }

  nextPage(): void {
    this.page += 1;
    this.activePage += 1;
  }

  prevPage(): void {
    this.page -= 1;
    this.activePage -= 1;
  }

  switchPage(pageNumber: number): void {
    this.page = pageNumber;
    this.activePage = pageNumber;
  }

  deleteData(deleteData): void {
    if (this.authService.isAuthenticated()) {
      const index = this.suggestDatas.indexOf(deleteData, 0);
      this.suggestDatas.splice(index, 1);
      this.eraService.suggestEraData(this.suggestDatas).subscribe(
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

  setListRecordNumber(selected: number): void {
    this.listRecordNumber = selected;
  }

  setPaginator(): void {
    this.pages = [];
    this.listSize = Math.ceil(this.filteredPostsList.length / this.listRecordNumber);
    for (let i = 0; i < this.listSize; i++) {
      this.pages.push(i + 1);
    }
  }

}
