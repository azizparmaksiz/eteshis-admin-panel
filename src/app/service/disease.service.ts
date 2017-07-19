/**
 * Created by seva on 7/9/17.
 */
import {Injectable} from '@angular/core';

import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {DiseaseCreateDto} from '../dto/disease-create';
import {Observable} from 'rxjs/Observable';
import {SERVER_URL} from '../config/app-constants';
import {DiseaseList} from '../dto/disease-list';
import {DiseaseTransCreateDto} from '../dto/disease-trans-create';
import {DiseaseUpdateDto} from '../dto/disease-update';
import {DiseaseTransId} from '../dto/disease-trans-id';
import {DiseaseTransDetail} from '../dto/disease-trans-detail';
@Injectable()
export class DiseaseService {
  // private tasksUrl = 'api/tasks';  // URL to web enable it when you will use in memory web api

  headers: Headers;

  constructor(private http: Http) {

    const basicAuthHeader = btoa(`betex:secret`);

    this.headers = new Headers();
    this.headers.append('Authorization', `Basic  ${basicAuthHeader}`);
    this.headers.append('Accept', `application/json; charset=utf-8`);
    this.headers.append('Content-Type', `application/json`);
  }


  getDiseaseList(): Promise<DiseaseList[]> {
    return this.http.get(SERVER_URL + '/disease/filter', {headers: this.headers})
      .toPromise()
      .then(response => response.json() as DiseaseList[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  deletedisease(id: number): Promise<void> {
    const url = `${SERVER_URL + '/disease/delete'}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  deleteTransDisease(transDelete: DiseaseTransId): Promise<DiseaseCreateDto> {
    return this.http
      .post(SERVER_URL + '/disease/transdelete', JSON.stringify(transDelete), {headers: this.headers})
      .toPromise()
      .then(() => transDelete)
      .catch(this.handleError);
  }

  getDiseaseDetail(diseaseTransId: DiseaseTransId): Promise<DiseaseTransDetail> {
    return this.http
      .post(SERVER_URL + '/disease/detail', JSON.stringify(diseaseTransId), {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createDisease(task: DiseaseCreateDto): Promise<DiseaseCreateDto> {
    console.log(JSON.stringify(task));
    return this.http
      .post(SERVER_URL + '/disease/create', JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }

  createTransDisease(task: DiseaseTransCreateDto): Promise<DiseaseTransCreateDto> {
    return this.http
      .post(SERVER_URL + '/disease/transcreate', JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }

  updateDisease(disease: DiseaseUpdateDto): Promise<DiseaseUpdateDto> {

    return this.http
      .put(SERVER_URL + '/disease/update', JSON.stringify(disease), {headers: this.headers})
      .toPromise()
      .then(() => disease)
      .catch(this.handleError);
  }

  updateTransDisease(disease: DiseaseTransCreateDto): Promise<DiseaseTransCreateDto> {

    return this.http
      .put(SERVER_URL + '/disease/transupdate', JSON.stringify(disease), {headers: this.headers})
      .toPromise()
      .then(() => disease)
      .catch(this.handleError);
  }


  search(term: string): Observable<DiseaseTransDetail[]> {
    return this.http
      .get(SERVER_URL + '/disease/filter' + `/?name=${term}`)
      .map(response => response.json());
  }


}
