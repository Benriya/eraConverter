import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-page',
  templateUrl: './modify-page.component.html',
  styleUrls: ['./modify-page.component.scss']
})
export class ModifyPageComponent implements OnInit {
  data;
  isEra: boolean;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }
}
