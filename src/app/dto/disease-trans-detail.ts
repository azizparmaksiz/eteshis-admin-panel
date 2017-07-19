import {LangCodeEnum} from './language-code.enum';
import {CategoryListDto} from './category-list';
import {AgeRangeDto} from './age-range';
import {MedicalTestDto} from './medical-test';
import {SymptomDiseaseDto} from './symptom-disease';

export class DiseaseTransDetail {

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
