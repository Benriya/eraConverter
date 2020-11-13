import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './main/front-page/front-page.component';
import {ModifyPageComponent} from "./main/modify-page/modify-page.component";
import {SignUpComponent} from "./main/sign-up/sign-up.component";
import {LoginComponent} from "./main/login/login.component";
import {AuthGuard} from "./services/auth-guard.service";



const routes: Routes = [
  { path: '', component: FrontPageComponent},
  { path: 'modifyRecord', component: ModifyPageComponent, canActivate: [AuthGuard] },
  { path: 'signUp', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
