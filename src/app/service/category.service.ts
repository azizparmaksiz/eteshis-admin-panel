/**
 * Created by seva on 7/9/17.
 */
import {Injectable} from '@angular/core';

import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Disease} from '../dto/disease';
import {Observable} from 'rxjs/Observable';
import {Category} from '../dto/category';
import {SERVER_URL} from '../config/app-constants';
@Injectable()
export class CategoryService {

  private categoriesUrl: string;  // URL to web
  constructor(private http: Http) {
    this.categoriesUrl = SERVER_URL + '/categories';
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getAllCategories(): Promise<Category[]> {
    return this.http.get(this.categoriesUrl)
      .toPromise()
      .then(response => response.json() as Category[])
      .catch(this.handleError);
  }
}
