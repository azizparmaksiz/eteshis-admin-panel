import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {credentials} from '../credentials';
import {AppMenuItem} from '../app.menu';

@Injectable()
export class AuthService {

  private authenticated = false;
  private tokenExpirationDate: Date = null;
  private userData: any = null;

  // @LocalStorage()
  private tokenData: Oauth2TokenData;

  public static decodeAccessToken(access_token: string) {

    return JSON.parse(window.atob(access_token.split('.')[1]));
  }

  constructor(public http: Http) {
    this.tokenData = JSON.parse(localStorage.getItem('tokenData'));
    console.log(this.tokenData);
    if (this.tokenData && this.tokenData.access_token) {
      this.authenticated = true;
      this.userData = AuthService.decodeAccessToken(this.tokenData.access_token);
      this.tokenExpirationDate = new Date(this.userData.exp * 1800);
      if (this.authenticated && this.tokenExpirationDate < new Date()) {
        console.log('Session timeout');
        this.logout();
      }
    }
  }

  public isAuthenticated(): boolean {
    this.checkTokenExpirationDate();
    return this.authenticated;
  }

  public authenticate(username: string, password: string): Promise<string> {

    console.log('Authentication pending...');

    return new Promise<string>((resolve, reject) => {

      if (!username.trim()) {
        reject('Username cannot be blank');
      }
      if (!password.trim()) {
        reject('Password cannot be blank');
      }

      const basicAuthHeader = btoa(`betex:secret`);

      const headers = new Headers();
      headers.append('Authorization', `Basic  ${basicAuthHeader}`);
      headers.append('Accept', `application/json; charset=utf-8`);
      headers.append('Content-Type', `application/x-www-form-urlencoded`);

      const payload = 'username=' + encodeURIComponent(username) + '&password='
        + encodeURIComponent(password) + '&grant_type=password';
      this.http
        .post(credentials.host + 'oauth/token', payload, {headers: headers})
        .subscribe(
          data => {

            this.tokenData = data.json();
            console.log(this.tokenData);
            //console.log(JSON.stringify(this.tokenData));
            this.authenticated = true;

            this.userData = AuthService.decodeAccessToken(this.tokenData.access_token);
            console.log(this.userData);
            this.tokenExpirationDate = new Date(this.userData.exp * 18000);
            resolve('OK');
            localStorage.setItem('tokenData', JSON.stringify(this.tokenData));
          },
          err => {
            console.log(err);
            reject('Username and password doesn\'t match');
          }
        );

    });
  }

  public refreshToken() {
    if (this.isAuthenticated()) {

      const basicAuthHeader = btoa(`betex:secret`);

      const headers = new Headers();
      headers.append('Authorization', `Basic  ${basicAuthHeader}`);
      headers.append('Accept', `application/json`);
      headers.append('Content-Type', `application/x-www-form-urlencoded`);

      const data = 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(this.tokenData.refresh_token);

      this.http
        .post(credentials.host + 'oauth/token', data, {headers: headers})
        .subscribe(
          sdata => {
            this.tokenData = sdata.json();
            this.authenticated = true;
            this.userData = AuthService.decodeAccessToken(this.tokenData.access_token);
            this.tokenExpirationDate = new Date(this.userData.exp * 1000);
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  public logout(): any {
    this.tokenData = new Oauth2TokenData();
    this.userData = null;
    this.authenticated = false;
    this.tokenExpirationDate = null;
    localStorage.setItem('tokenData', '{}');
    console.log('logout bitti');
  }

  public getUserData(): any {
    return this.userData;
  }

  public getTokenExpirationDate(): Date {
    return this.tokenExpirationDate;
  }

  public hasRole(role: string): boolean {
    if (this.isAuthenticated()) {
      return true; //this.getUserData()['authorities'].indexOf(role) >= 0;
    }
    return false;
  }

  public hasAnyRole(roles: string[]): boolean {
    let ok = false;
    roles.forEach(role => {
      if (this.hasRole(role)) {
        ok = true;
      }
    });
    return ok;
  }

  public canView(view: AppMenuItem): boolean {
    let ok = false;
    if (!view.roles) {
      ok = true;
    } else {
      ok = this.hasAnyRole(view.roles);
    }
    return ok;
  }

  public getAuthorizationHeaders(): Headers {
    const authorizationHeaders = new Headers();
    if (this.authenticated) {
      authorizationHeaders.append('Authorization', `Bearer ${this.tokenData.access_token}`);
      authorizationHeaders.append('Accept', `application/json`);
      authorizationHeaders.append('Content-Type', `application/json`);
    }
    return authorizationHeaders;
  }

  private checkTokenExpirationDate() {
    //console.log(this.tokenExpirationDate);
    if (this.authenticated && this.tokenExpirationDate < new Date()) {
      console.log('Session timeout');
      this.logout();
    }
  }

  // private fetchUserData() {
  //   this.http.get('/api/user', {headers: this.getAuthorizationHeaders()})
  //       .subscribe(
  //           data => {
  //             this.userData = data.json();
  //           },
  //           err => this.authenticated = false
  //       );
  // }

}

class Oauth2TokenData {
  access_token: string = null;
  token_type: string = null;
  expires_in: number = null;
  scope: string = null;
  jti: string = null;
  refresh_token: string = null;
  organization: string = null;

  constructor() {
  }
}
