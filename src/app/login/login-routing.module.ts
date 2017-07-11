import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login.component';
import {NgModule} from '@angular/core';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class LoginRoutingModule {
}



