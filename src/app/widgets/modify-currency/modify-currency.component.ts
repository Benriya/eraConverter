import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EraServiceService } from '../../services/era-service.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-modify-currency',
  templateUrl: './modify-currency.component.html',
  styleUrls: ['./modify-currency.component.scss']
})
export class ModifyCurrencyComponent implements OnInit {
  currencyData;
  currencyDatas = [];
  modified;

  constructor(private route: ActivatedRoute, private router: Router, private eraService: EraServiceService, private global: GlobalService) {
    this.global.getCurrencyData(this.currencyDatas);
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.currencyData = data;
      console.log(data);
    });
    this.currencyData = JSON.parse(JSON.stringify(this.currencyData));
  }

  updateData(): void {
    this.global.updateData(this.currencyData, this.currencyDatas);
    this.putModifiedData(this.currencyDatas);
    this.returnFrontPage();
  }

  putModifiedData(modified): void {
    this.eraService.postCurrencyData(modified).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  returnFrontPage(): void {
    this.router.navigate(['/home'], { relativeTo: this.route });
  }

}
