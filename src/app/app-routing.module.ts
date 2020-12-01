import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './main/front-page/front-page.component';
import {ModifyPageComponent} from "./main/modify-page/modify-page.component";
import {SignUpComponent} from "./main/sign-up/sign-up.component";
import {LoginComponent} from "./main/login/login.component";
import {AuthGuard} from "./services/auth-guard.service";
import {PasswordResetComponent} from "./main/password-reset/password-reset.component";
import {UserManagementComponent} from "./main/user-management/user-management.component";


const routes: Routes = [
  { path: '', component: FrontPageComponent},
  { path: 'modifyRecord', component: ModifyPageComponent, canActivate: [AuthGuard] },
  { path: 'signUp', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'passwordReset', component: PasswordResetComponent },
  { path: 'userManagement', component: UserManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
