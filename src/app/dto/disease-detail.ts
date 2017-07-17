import {LangCodeEnum} from './language-code.enum';
import {CategoryListDto} from './category-list';
import {AgeRangeDto} from './age-range';
import {MedicalTestDto} from './medical-test';
import {SymptomDiseaseDto} from './symptom-disease';
/**
 * Created by seva on 7/16/17.
 */
export class DiseaseDetail {

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
  diseaseSymptomList: Array<SymptomDiseaseDto>;
  medicalTestList: Array<MedicalTestDto>;
  ageRangeList: Array<AgeRangeDto>;
  categoryList: Array<CategoryListDto>;
}
