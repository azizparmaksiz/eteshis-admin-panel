/**
 * Created by seva on 7/9/17.
 */
import {Injectable} from '@angular/core';

import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {SERVER_URL} from '../config/app-constants';
@Injectable()
export class AgeRangeService {

  private ageRangeUrl: string;  // URL to web
  constructor(private http: Http) {
    this.ageRangeUrl = SERVER_URL + '/ageRanges';
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getAllAgeRanges(): Promise<any[]> {
    return this.http.get(this.ageRangeUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
}
