import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import { DataTableComponent } from './widgets/data-table/data-table.component';
import { AddDataComponent } from './widgets/add-data/add-data.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModifyComponent } from './widgets/modify/modify.component'
import {AppRoutingModule} from "./app-routing.module";
import { FrontPageComponent } from './main/front-page/front-page.component';
import { ModifyPageComponent } from './main/modify-page/modify-page.component';
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { HeaderComponent } from './widgets/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    AddDataComponent,
    ModifyComponent,
    FrontPageComponent,
    ModifyPageComponent,
    HeaderComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FontAwesomeModule,
        AppRoutingModule,
        MatOptionModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
