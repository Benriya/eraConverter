import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-sort-list',
  templateUrl: './sort-list.component.html',
  styleUrls: ['./sort-list.component.scss']
})
export class SortListComponent implements OnInit {
  @Input() filteredPostsList;
  @Input() eraDatas;
  @Input() searchType: boolean;
  @Output() listRecord = new EventEmitter<number>();
  @Output() filteredPost = new EventEmitter<any>();
  searchOption: string;
  listRecordNumber = 50;

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.searchOption = '';
    console.log(this.eraDatas);
    console.log(this.filteredPostsList);
  }

  setListRecordNumber(selected: number): void {
    this.listRecordNumber = selected;
    this.listRecord.emit(selected);
  }

  filterOptions() {
    if (this.searchType) {
      this.filteredPostsList = this.globalService.filteredListOptionsEra(this.filteredPostsList, this.searchOption, this.eraDatas);
    } else {
      this.filteredPostsList = this.globalService.filteredListOptionsCurrency(this.filteredPostsList, this.searchOption, this.eraDatas);
    }
    this.filteredPost.emit(this.filteredPostsList);
  }

  resetSearch(): void {
    this.filteredPostsList = this.eraDatas;
    this.searchOption = '';
    this.filteredPost.emit(this.filteredPostsList);
  }

}
