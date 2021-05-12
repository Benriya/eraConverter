import { Component, OnInit } from '@angular/core';
import { EraServiceService } from '../../services/era-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  eraData;
  eraDatas = [];
  modified;

  constructor(private route: ActivatedRoute, private router: Router, private eraService: EraServiceService, private global: GlobalService) {
    this.global.getEraData(this.eraDatas);
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.eraData = data;
      console.log(data);
    });
    this.eraData = JSON.parse(JSON.stringify(this.eraData));
  }

  updateData(): void {
    this.global.updateData(this.eraData, this.eraDatas)
    this.putModifiedData(this.eraDatas);
    this.returnFrontPage();
  }

  putModifiedData(currencyData): void {
    this.eraService.postEraData(currencyData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  returnFrontPage(): void {
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
}
