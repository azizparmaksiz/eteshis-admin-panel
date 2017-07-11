/**
 * Created by seva on 7/10/17.
 */
import {Component, Input, OnInit} from '@angular/core';
import {Disease} from './disease';
import {DiseaseService} from './disease.service';
import 'rxjs/add/operator/switchMap';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DiseaseDetailEnum} from './disease-detail.enum';

@Component({
  selector: 'disease-detail',
  templateUrl: './disease-detail.component.html',
})


export class DiseaseDetailComponent implements OnInit {
  @Input() diseaseId: number;
  @Input() diseaseDetailMode= DiseaseDetailEnum.editMode;
  disease: Disease;

  constructor(private diseaseService: DiseaseService,
              public activeModal: NgbActiveModal) {

  }

  initializeDisease(): void {
    this.diseaseService.getDisease(this.diseaseId).then(disease => this.disease = disease);
  }

  ngOnInit() {
    if (this.diseaseDetailMode === DiseaseDetailEnum.createMode) {
      this.disease = new Disease();
    } else {
      this.initializeDisease();
    }

  }

  save(): void {
    if (this.diseaseDetailMode === DiseaseDetailEnum.createMode) {
      this.diseaseService.createDisease(this.disease);
    } else {
      this.diseaseService.updateDisease(this.disease);
    }
  }
}

