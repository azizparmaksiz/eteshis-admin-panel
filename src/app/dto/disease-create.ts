import {GenderEnum} from './gender.enum';
import {LangCodeEnum} from './language-code.enum';
/**
 * Created by seva on 7/9/17.
 */

export class DiseaseCreate {
  probability: number;
  code: string;
  url: string;
  referances: string;
  diseaseName: string;
  description: string;
  skop: string;
  medicoName: string;
  treatment: string;
  riskFactor: string;
  selfCare: string;
  diagnosedBy: string;
  whatToExpect: string;
  howCommon: string;
  usedRisk: string;
  enabled: boolean;
  approvaled: boolean;
  gender: GenderEnum;
  langCode: LangCodeEnum;
  categoryIdList: Array<number>;
  medicalTestIdList: Array<number>;
  ageRangeIdList: Array<number>;
}
