import {Component} from "@angular/core";
import "rxjs/add/operator/switchMap";

import {DiseaseTransCreateDto} from "../../dto/disease-trans-create";
import {EnumEx} from "../../util/EnumEx";
import {LangCodeEnum} from "../../dto/language-code.enum";
import {DiseaseService} from "../../service/disease.service";
import {DiseaseTransDetail} from "../../dto/disease-trans-detail";
import {SymptomService} from "../../service/symptom.service";
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'disease-trans-create',
  templateUrl: './disease-trans-create.component.html'

})


export class DiseaseTransCreateComponent {

  displayDialog = false;


  /**
   * whether DiseaseTrans component will be initialized with create or edit mode.
   */
  createMode = true;
  diseaseTransCreate: DiseaseTransCreateDto;

  symptomList: Array<any>;
  langCodes: Array<any>;


  constructor(private diseaseService: DiseaseService, private symptomService: SymptomService,
            private  translate:TranslateService) {

  }

  private initializeCommon() {
    this.langCodes = EnumEx.getDropDownArrayFromEnum(LangCodeEnum);
    this.symptomList = this.getSymptomList();
  }

  /**
   * get symptom list from server
   */
  private getSymptomList(): Array<any> {
    const items: any[] = [];
    this.symptomService.getAllsymptoms().then(symptom => {
      symptom.forEach(pair => {
        const prodType = {'label': pair.symptomName, 'value': pair.diseaseSymptomId.toString()};
        items.push(prodType);
      });
    });

    return items;
  }
  private oldLangCode: string;
  /**
   * initialize disease trans in create mode
   */
  initializeDiseaseTransForCreate(langId: number, diseaseID: number): void {
    this.initializeCommon();
    this.diseaseTransCreate = new DiseaseTransCreateDto();
    this.displayDialog = true;
    this.diseaseTransCreate.langCode = langId;
    this.oldLangCode=this.translate.currentLang;
    this.translate.use(LangCodeEnum[langId].toLowerCase());
  }

  /**
   * this function triggered from diseaseTransDetail.edit function
   * transDetail object injected from TransDetail
   * initialize disease trans in edit mode
   */
  initializeDiseaseTransForUpdate(transDetail: DiseaseTransDetail): void {
    this.initializeCommon();
    this.diseaseTransCreate = new DiseaseTransCreateDto();
    this.diseaseTransCreate.initializeParamsFromTransDetail(transDetail);
    this.createMode = false;
    this.displayDialog = true;
  }
  /**
   * save disease trans
   */
  save(): void {
    this.diseaseService.createTransDisease(this.diseaseTransCreate);
  }
  /**
   * update disease trans
   */
  update(): void {
    this.diseaseService.updateTransDisease(this.diseaseTransCreate);
  }

  close(): void {
    this.displayDialog = false;
    this.translate.use(this.oldLangCode);
  }

}
