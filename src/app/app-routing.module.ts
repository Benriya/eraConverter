import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './main/front-page/front-page.component';
import {ModifyPageComponent} from "./main/modify-page/modify-page.component";



const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'modifyRecord', component: ModifyPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
