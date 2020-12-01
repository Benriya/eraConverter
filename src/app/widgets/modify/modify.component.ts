import {Component, Input, OnInit } from '@angular/core';
import {EraServiceService} from '../../services/era-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  @Input() eraData;

  eraDatas = [];

  constructor(private route: ActivatedRoute, private router: Router, private eraService: EraServiceService) {
    this.eraService.getEraData().pipe(map((data: any) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.eraDatas.push(data[key]);
        }
      }
      return this.eraDatas;
    })).subscribe();
  }

  ngOnInit(): void {
    this.eraData = JSON.parse(JSON.stringify(this.eraData));
    console.log(this.eraData);
  }

  updateData(): void {
    this.eraData.id = +this.eraData.id;
    for (let i = 0; i < this.eraDatas.length; i++) {
      if (+this.eraData.id === +this.eraDatas[i].id){
        this.eraDatas[i] = this.eraData;
        this.putModifiedData();
      }
    }
    this.returnFrontPage();
  }

  putModifiedData(): void {
    this.eraService.postEraData(this.eraDatas).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  returnFrontPage(): void {
    this.router.navigate([''], { relativeTo: this.route });
  }
}
