/**
 * Created by seva on 7/9/17.
 */
import {Injectable} from '@angular/core';

import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {SERVER_URL} from '../config/app-constants';
import {CategoryListDto} from "../dto/category-list";
@Injectable()
export class CategoryService {

  private categoriesUrl: string;  // URL to web
  headers: Headers;

  constructor(private http: Http) {

    const basicAuthHeader = btoa(`betex:secret`);

    this.headers = new Headers();
    this.headers.append('Authorization', `Basic  ${basicAuthHeader}`);
    this.headers.append('Accept', `application/json; charset=utf-8`);
    this.headers.append('Content-Type', `application/json`);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /**
   * get categories in selected language
   * */
  getAllCategories(langCodeId:number): Promise<CategoryListDto[]> {
    const url = `${SERVER_URL + '/category/lang'}/${langCodeId}`;

    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json() )
      .catch(this.handleError);
  }


}
