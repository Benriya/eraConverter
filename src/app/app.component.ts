import {Component, OnInit} from '@angular/core';
import { EraServiceService } from "./services/era-service.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'eraconverter-Web';

  constructor() {}

  ngOnInit() {}

}
