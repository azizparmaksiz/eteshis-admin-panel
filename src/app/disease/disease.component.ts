import {Component, OnInit} from '@angular/core';
import {Disease} from './disease';
import {DiseaseService} from './disease.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DiseaseDetailComponent} from './disease-detail.component';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {DiseaseDetailEnum} from './disease-detail.enum';
@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
})
export class DiseaseComponent implements OnInit {

  diseaseArray: Observable<Disease[]>;
  private searchTerms = new Subject<string>();

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


  constructor(private diseaseService: DiseaseService,
              private modelService: NgbModal) {
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
    const modalRef = this.modelService.open(DiseaseDetailComponent);

    modalRef.componentInstance.diseaseId = diseaseId;
  }

  addDisease(): void {
    const modalRef = this.modelService.open(DiseaseDetailComponent);

    modalRef.componentInstance.diseaseDetailMode = DiseaseDetailEnum.createMode;
  }
}
