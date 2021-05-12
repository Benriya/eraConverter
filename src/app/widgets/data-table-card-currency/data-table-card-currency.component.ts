import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { currencyData } from '../../models/currencyData.model';

@Component({
  selector: 'app-data-table-card-currency',
  templateUrl: './data-table-card-currency.component.html',
  styleUrls: ['./data-table-card-currency.component.scss']
})
export class DataTableCardCurrencyComponent implements OnInit {
  @Input() dataset: currencyData;
  @Input() visible: boolean;
  @Input() suggest: boolean;
  @Output() eraDatasEmitter = new EventEmitter<currencyData>();
  @Output() postDataset = new EventEmitter<currencyData>();

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
