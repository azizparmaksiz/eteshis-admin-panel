import {LangCodeEnum} from './language-code.enum';
/**
 * Created by seva on 7/14/17.
 */
export class Category {
  id: number;
  categoryName: string;
  description: string;
  enable: boolean;
  langCode: LangCodeEnum;
  viewIndex: number;
}

