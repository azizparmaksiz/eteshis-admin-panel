/**
 * Created by seva on 7/10/17.
 */
import {Component} from '@angular/core';
import {Disease} from '../dto/disease';
import {DiseaseService} from './disease.service';
import 'rxjs/add/operator/switchMap';
import {DiseaseDetailEnum} from './disease-detail.enum';

@Component({
  selector: 'disease-detail',
  templateUrl: './disease-detail.component.html',
  styleUrls: ['./disease-detail.component.css']
})


export class DiseaseDetailComponent {
  displayDialog = false;
  diseaseDetailMode = DiseaseDetailEnum.editMode;
  disease: Disease;

  constructor(private diseaseService: DiseaseService) {
    this.disease = new Disease();
  }

  initializeDisease(id: number, initializeMode: DiseaseDetailEnum): void {
    this.diseaseDetailMode = initializeMode;
    if (initializeMode === DiseaseDetailEnum.createMode) {
      this.disease = new Disease();
    } else {
      this.diseaseService.getDisease(id).then(disease => this.disease = disease);
    }
    this.displayDialog = true;
  }

  save(): void {
    this.diseaseService.updateDisease(this.disease);
  }

  update(): void {
    this.diseaseService.createDisease(this.disease);
  }

  close(): void {
    this.displayDialog = false;
  }
}

