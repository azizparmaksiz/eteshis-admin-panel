import {Component, OnInit, ViewChild} from '@angular/core';
import {Disease} from '../dto/disease';
import {DiseaseService} from './disease.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {DiseaseDetailEnum} from './disease-detail.enum';
import {DiseaseDetailComponent} from './disease-detail.component';
@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',

})
export class DiseaseComponent implements OnInit {
  @ViewChild(DiseaseDetailComponent) diseaseDetailComp: DiseaseDetailComponent;


  diseaseArray: Observable<Disease[]>;
  private searchTerms = new Subject<string>();

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


  constructor(private diseaseService: DiseaseService) {
  }


  ngOnInit(): void {
    this.diseaseArray = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.diseaseService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Disease[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Disease[]>([]);
      });
  }

  openDisease(diseaseId: number): void {
    this.diseaseDetailComp.initializeDisease(diseaseId, DiseaseDetailEnum.editMode);
  }

  addDisease(): void {
    this.diseaseDetailComp.initializeDisease(-1, DiseaseDetailEnum.createMode);

  }
}
