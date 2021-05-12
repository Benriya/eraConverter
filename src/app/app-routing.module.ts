import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './main/front-page/front-page.component';
import {SignUpComponent} from "./main/sign-up/sign-up.component";
import {LoginComponent} from "./main/login/login.component";
import {AuthGuard} from "./services/auth-guard.service";
import {PasswordResetComponent} from "./main/password-reset/password-reset.component";
import {UserManagementComponent} from "./main/user-management/user-management.component";
import {SuggestsListComponent} from "./widgets/suggests-list/suggests-list.component";
import {ModifyCurrencyComponent} from "./widgets/modify-currency/modify-currency.component";
import {ModifyComponent} from "./widgets/modify/modify.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: FrontPageComponent },
  { path: 'modifyRecord', component: ModifyComponent, canActivate: [AuthGuard] },
  { path: 'modifyCurrency', component: ModifyCurrencyComponent, canActivate: [AuthGuard] },
  { path: 'signUp', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'passwordReset', component: PasswordResetComponent },
  { path: 'userManagement', component: UserManagementComponent },
  { path: 'suggests', component: SuggestsListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
