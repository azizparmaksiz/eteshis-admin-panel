import {CategoryListDto} from './category-list';

export class DiseaseList {

  diseaseId: number;
  diseaseName: string;
  categoryList: Array<CategoryListDto>;
}
