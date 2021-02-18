import { Component, DoCheck, OnInit } from '@angular/core';
import {EraServiceService} from '../../services/era-service.service';
import {AuthService} from '../../services/auth.service';
import {map} from 'rxjs/operators';
import {ResponsiveService} from "../../services/responsive.service";
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  providers: [EraServiceService],
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements DoCheck, OnInit {
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

  constructor(private eraService: EraServiceService, private authService: AuthService, private responsiveService: ResponsiveService,
              private globalService: GlobalService) {
    this.getEraDatas();
  }

  ngOnInit(): void {
    if (this.authService.admin) {
      this.visible = true;
    }
    this.filteredPostsList = this.eraDatas;
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
    this.globalService.filteredListOptions(this.filteredPostsList, this.searchOption, this.eraDatas);
  }

  resetSearch(): void {
    this.filteredPostsList = this.eraDatas;
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
      const index = this.eraDatas.indexOf(deleteData, 0);
      this.eraDatas.splice(index, 1);
      this.eraService.postEraData(this.eraDatas).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  setListRecordNumber(selected: number): void {
    this.listRecordNumber = selected;
  }

  setPaginator(): void {
    this.pages = [];
    this.listSize = Math.ceil(this.eraDatas.length / this.listRecordNumber);
    // console.log(this.listSize);
    for (let i = 0; i < this.listSize; i++) {
      this.pages.push(i + 1);
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


  /*openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }*/
}
