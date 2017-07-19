import {LangCodeEnum} from './language-code.enum';
import {DiseaseTransDetail} from "./disease-trans-detail";
/**
 * Created by seva on 7/16/17.
 */
export class DiseaseTransCreateDto {
  diseaseId: number;
  diseaseName: string;
  medicoName: string;
  description: string;
  treatment: string;
  riskFactor: string;
  selfCare: string;
  diagnosedBy: string;
  whatToExpect: string;
  howCommon: string;
  usedRisk: string;
  langCode: LangCodeEnum;
  symptomIdList: Array<number>;



  initializeParamsFromTransDetail(transDetail: DiseaseTransDetail) {
    this.diseaseId = transDetail.diseaseId;
    this.diseaseName = transDetail.diseaseName;
    this.medicoName = transDetail.medicoName;
    this.description = transDetail.description;
    this.treatment = transDetail.treatment;
    this.riskFactor = transDetail.riskFactor;
    this.selfCare = transDetail.selfCare;
    this.diagnosedBy = transDetail.diagnosedBy;
    this.whatToExpect = transDetail.whatToExpect;
    this.howCommon = transDetail.howCommon;
    this.usedRisk = transDetail.usedRisk;
    this.langCode = transDetail.langCode;

    if( transDetail.diseaseSymptomList && transDetail.diseaseSymptomList.length>0){
    transDetail.diseaseSymptomList.forEach(
      symptom => {
        this.symptomIdList.push(symptom.diseaseSymptomId)
      });
    }
  }

}
