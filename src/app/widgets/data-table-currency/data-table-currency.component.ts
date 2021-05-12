import {Component, DoCheck, OnInit} from '@angular/core';
import { EraServiceService } from '../../services/era-service.service';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-data-table-currency',
  templateUrl: './data-table-currency.component.html',
  styleUrls: ['./data-table-currency.component.scss']
})
export class DataTableCurrencyComponent implements OnInit, DoCheck {
  currencyDatas = [];
  listRecord = 50;
  page = 1;
  visible = false;
  filteredPostsList;

  constructor(private eraService: EraServiceService, private authService: AuthService, private global: GlobalService) {
    this.global.getCurrencyData(this.currencyDatas);
  }

  ngOnInit(): void {
    this.filteredPostsList = this.currencyDatas;
  }

  ngDoCheck(): void {
    if (this.authService.checkIfAdmin()) this.visible = true;
  }

  deleteData(deleteData): void {
    if (this.authService.isAuthenticated()) {
      const index = this.currencyDatas.indexOf(deleteData, 0);
      this.currencyDatas.splice(index, 1);
      this.eraService.postCurrencyData(this.currencyDatas).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
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
