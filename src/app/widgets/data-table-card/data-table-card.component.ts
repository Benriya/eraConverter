import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {eraData} from "../../models/eraData.model";

@Component({
  selector: 'app-data-table-card',
  templateUrl: './data-table-card.component.html',
  styleUrls: ['./data-table-card.component.scss']
})
export class DataTableCardComponent implements OnInit {
  @Input() dataset: eraData;
  @Input() visible;
  @Output() eraDatasEmitter = new EventEmitter<eraData>();
  @Output() postDataset = new EventEmitter<eraData>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteData() {
    this.eraDatasEmitter.emit(this.dataset);
  }

  postData() {
    this.postDataset.emit(this.dataset);
  }

}
