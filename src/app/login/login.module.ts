import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';

import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {AuthService} from '../auth/auth.service';
@NgModule({
  imports: [
    LoginRoutingModule, FormsModule, HttpModule, BrowserModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class LoginModule {
}
