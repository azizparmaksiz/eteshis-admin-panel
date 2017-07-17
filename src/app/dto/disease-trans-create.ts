import {LangCodeEnum} from './language-code.enum';
/**
 * Created by seva on 7/16/17.
 */
export class DiseaseTransCreate{
  diseaseId: number;
  diseaseName: string;
  description: string;
  medicoName: string;
  treatment: string;
  riskFactor: string;
  selfCare: string;
  diagnosedBy: string;
  whatToExpect: string;
  howCommon: string;
  usedRisk: string;
  langCode: LangCodeEnum;
  symptomIdList: Array<number>;

}
