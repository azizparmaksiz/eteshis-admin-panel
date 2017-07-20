import {LangCodeEnum} from './language-code.enum';

export class CategoryCreateDto {
  categoryId:number; //it is used only for trans category
  categoryName: string;
  description: string;
  enabled: boolean;
  langCode: LangCodeEnum;
  viewIndex: number;//it is used only for category
}

