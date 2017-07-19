/**
 * Created by apar on 7/17/17.
 */
import {Component, EventEmitter, Output} from "@angular/core";
// Observable class extensions
import "rxjs/add/observable/of";
// Observable operators
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {DiseaseTransDetail} from "../../dto/disease-trans-detail";
import {DiseaseService} from "../../service/disease.service";
import {TranslateService} from "ng2-translate";
import {LangCodeEnum} from "../../dto/language-code.enum";


@Component({
  selector: 'disease-trans-detail',
  templateUrl: './disease-trans-detail.component.html',
})
export class DiseaseTransDetailComponent {
  displayDialog = false;
  diseaseTransDetail: DiseaseTransDetail;

  constructor(private diseaseService: DiseaseService, private translate: TranslateService) {
  }

  @Output() transEditEvent = new EventEmitter();
  private oldLangCode: string;

  initializeTransDisease(langId: number, diseaseID: number) {

    //TODO: this.diseaseService.getDiseaseDetail({"diseaseId":diseaseID,"langCode":langId}).then(disease => {
    //   this.diseaseTransDetail = disease;
    // });
    this.diseaseTransDetail = new DiseaseTransDetail();
    this.displayDialog = true;
    this.oldLangCode = this.translate.currentLang;
    this.translate.use(LangCodeEnum[langId].toLowerCase());
  }

  close(): void {
    this.displayDialog = false;
    this.translate.use(this.oldLangCode);

  }

  edit(): void {
    this.displayDialog = false;
    this.callParent();
  }

  callParent() {
    this.transEditEvent.next(this.diseaseTransDetail);
  }
}
