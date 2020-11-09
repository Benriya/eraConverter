import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {EraServiceService} from "../../services/era-service.service";
import {eraData} from "../../models/eraData.model";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  @Input() eraData;

  eraDatas = [];

  constructor(private route: ActivatedRoute, private router: Router, private eraService: EraServiceService) { }

  ngOnInit(): void {
    this.eraData = JSON.parse(JSON.stringify(this.eraData));
    this.eraService.getEraData(this.eraDatas);
    console.log(this.eraData);
  }

  updateData() {
    this.eraData.id = +this.eraData.id;
    for (let i = 0; i < this.eraDatas.length; i++) {
      if (+this.eraData.id === +this.eraDatas[i].id){
        this.eraDatas[i] = this.eraData;
        this.putModifiedData();
      }
    }
    this.returnFrontPage();
  }

  putModifiedData() {
    this.eraService.postEraData(this.eraDatas).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  returnFrontPage() {
    this.router.navigate([''], { relativeTo: this.route });
  }
}
