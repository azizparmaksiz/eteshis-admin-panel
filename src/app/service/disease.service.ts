/**
 * Created by seva on 7/9/17.
 */
import {Injectable} from '@angular/core';

import { Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Disease} from '../dto/disease';
import {Observable} from 'rxjs/Observable';
import {HEADERS_CONST, SERVER_URL} from '../config/app-constants';
@Injectable()
export class DiseaseService {
  // private tasksUrl = 'api/tasks';  // URL to web enable it when you will use in memory web api
  private diseasesUrl: string;  // URL to web
  constructor(private http: Http) {
    this.diseasesUrl = SERVER_URL + '/diseases';
  }


  getAllTask(): Promise<Disease[]> {
    return this.http.get(this.diseasesUrl)
      .toPromise()
      .then(response => response.json() as Disease[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  deleteTask(id: number): Promise<void> {
    const url = `${this.diseasesUrl}/${id}`;
    return this.http.delete(url, {headers: HEADERS_CONST})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getDisease(id: number): Promise<Disease> {
    const url = `${this.diseasesUrl}/${id}`;
    return this.http.get(url).toPromise().then(response => response.json() as Disease);
  }

  createDisease(task: Disease): Promise<Disease> {
    return this.http
      .post(this.diseasesUrl, JSON.stringify(task), {headers: HEADERS_CONST})
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }

  updateDisease(task: Disease): Promise<Disease> {
    const url = `${this.diseasesUrl}/${task.id}`;
    return this.http
      .put(url, JSON.stringify(task), {headers: HEADERS_CONST})
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }

  search(term: string): Observable<Disease[]> {
    return this.http
      .get(this.diseasesUrl + `/?name=${term}`)
      .map(response => response.json());
  }


}
