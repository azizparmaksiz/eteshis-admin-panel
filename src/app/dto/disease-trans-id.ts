import {LangCodeEnum} from './language-code.enum';
/**
 * Created by seva on 7/16/17.
 */
export class DiseaseTransId {
  diseaseId: number;
  langCode: LangCodeEnum;

  constructor(diseaseId:number,langCodeEnum:LangCodeEnum){
    this.diseaseId=diseaseId;
    this.langCode=langCodeEnum;
  }

}
