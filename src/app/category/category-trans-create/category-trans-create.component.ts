import {Component} from "@angular/core";
import {CategoryCreateDto} from "../../dto/category-create";
import {TranslateService} from "ng2-translate";
import {CategoryService} from "../../service/category.service";
import {LangCodeEnum} from "../../dto/language-code.enum";
import {EnumEx} from "../../util/EnumEx";

@Component({
  selector: 'category-trans-create',
  templateUrl: './category-trans-create.component.html',

})


export class CategoryTransCreateComponent {

  category: CategoryCreateDto;
  displayDialog = false;
  createMode = true;
  langCodes: Array<any>;

  constructor(private translate: TranslateService, private categoryService: CategoryService) {
  }

  private oldLangCode: string;



  close(): void {
    this.displayDialog = false;
    this.translate.use(this.oldLangCode);
  }

  save(): void {
    this.categoryService.createTransCategory(this.category);
  }

  update(): void {

  }


  initializeForTransCreate(langCode:LangCodeEnum): void {
    this.langCodes = EnumEx.getDropDownArrayFromEnum(LangCodeEnum);
    this.oldLangCode = this.translate.currentLang;
    this.displayDialog = true;
    this.category = new CategoryCreateDto();// get it from server for langCode
    this.translate.use(LangCodeEnum[langCode].toLowerCase());
  }

}
