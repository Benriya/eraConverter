import {AfterViewInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {EraServiceService} from "../../services/era-service.service";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  providers: [EraServiceService],
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements DoCheck, OnInit {
  eraDatas = [];
  page;
  pages = [];
  listRecordNumber = 50;
  activePage = 1;

  constructor(private eraService: EraServiceService) { }

  ngOnChanges() {

  }

  ngOnInit() {
    this.eraService.getEraData(this.eraDatas);
    this.setPaginator();
  }

  ngDoCheck() {
   // this.setPaginator();
  }

  ngAfterViewInit() {

  }

  nextPage() {

    this.page += 1;
    this.activePage += 1;
  }

  prevPage() {
    this.page -= 1;
    this.activePage -= 1;
  }

  switchPage(pageNumber: number) {
    this.page = pageNumber;
    this.activePage = pageNumber;
  }

  deleteData(deleteData) {
    const index = this.eraDatas.indexOf(deleteData, 0);
    this.eraDatas.splice(index, 1);
    this.eraService.postEraData(this.eraDatas).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  setListRecordNumber(selected: number) {
    this.listRecordNumber = selected;
  }

  setPaginator() {
    this.page = 1;
    this.pages = [];
    for (let i = 0; i < 3; i++) {
      this.pages.push(i+1);
    }
    console.log(this.pages);
  }
}
