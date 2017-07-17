import {GenderEnum} from './gender.enum';
/**
 * Created by seva on 7/16/17.
 */
export class DiseaseUpdateDto {
  diseaseId: number;
  code: string;
  url: string;
  referances: string;
  enabled: boolean;
  approvaled: boolean;
  probability: number;
  gender: GenderEnum;
  categoryIdList: Array<number>;
  medicalTestIdList: Array<number>;
  ageRangeIdList: Array<number>;
}
