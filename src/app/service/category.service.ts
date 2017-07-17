/**
 * Created by seva on 7/9/17.
 */
import {Injectable} from '@angular/core';

import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Category} from '../dto/category';
import {SERVER_URL} from '../config/app-constants';
@Injectable()
export class CategoryService {

  private categoriesUrl: string;  // URL to web
  headers: Headers;

  constructor(private http: Http) {

    const basicAuthHeader = btoa(`betex:secret`);

    this.headers = new Headers();
    this.headers.append('Authorization', `Basic  ${basicAuthHeader}`);
    this.headers.append('Accept', `application/json; charset=utf-8`);
    this.headers.append('Content-Type', `application/x-www-form-urlencoded`);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getAllCategories(): Promise<Category[]> {
    return this.http.get(SERVER_URL + '/category/filter', {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Category[])
      .catch(this.handleError);
  }


}
