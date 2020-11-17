import {AfterViewInit, ChangeDetectorRef, Component, DoCheck, Injectable, OnChanges, OnInit} from '@angular/core';
import {EraServiceService} from "../../services/era-service.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthService} from "../../services/auth.service";
import {AddDataComponent} from "../add-data/add-data.component";
import {map} from "rxjs/operators";

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
  eraDataTypes = ['name', 'age', 'income', 'possessions', 'cost', 'source', 'description', 'id'];

  constructor(private eraService: EraServiceService, private authService: AuthService) {
    this.eraService.getEraData().pipe(map(data => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.eraDatas.push(data[key]);
        }
      }
      return this.eraDatas;
    })).subscribe();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.visible = true;
    }
    this.filteredPostsList = this.eraDatas;
    console.log(this.filteredPostsList);
    this.page = 1;
  }

  ngDoCheck() {
    this.setPaginator();
  }

  filteredListOptions() {
    this.filteredPostsList = [];
      for (const post of this.eraDatas) {
        if (post.name.toLowerCase().includes(this.searchOption.toLowerCase()) ||
          post.age.toLowerCase().includes(this.searchOption.toLowerCase()) ||
          post.income.toLowerCase().includes(this.searchOption.toLowerCase()) ||
          post.age.toLowerCase().includes(this.searchOption.toLowerCase()) ||
          post.income.toLowerCase().includes(this.searchOption.toLowerCase()) ||
          post.cost.toLowerCase().includes(this.searchOption.toLowerCase()) ||
          post.possessions.toLowerCase().includes(this.searchOption.toLowerCase()) ||
          post.description.toLowerCase().includes(this.searchOption.toLowerCase()) ||
          post.source.toLowerCase().includes(this.searchOption.toLowerCase()) ||
          post.id.toString().includes(this.searchOption.toLowerCase())) {
          this.filteredPostsList.push(post);
        }
      }
    return this.filteredPostsList;
  }

  resetSearch() {
    this.filteredPostsList = this.eraDatas;
    this.searchOption = '';
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
    if (this.authService.isAuthenticated()) {
      const index = this.eraDatas.indexOf(deleteData, 0);
      this.eraDatas.splice(index, 1);
      this.eraService.postEraData(this.eraDatas).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  setListRecordNumber(selected: number) {
    this.listRecordNumber = selected;
  }

  setPaginator() {
    this.pages = [];
    this.listSize = Math.ceil(this.eraDatas.length / this.listRecordNumber);
    //console.log(this.listSize);
    for (let i = 0; i < this.listSize; i++) {
      this.pages.push(i+1);
    }
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
