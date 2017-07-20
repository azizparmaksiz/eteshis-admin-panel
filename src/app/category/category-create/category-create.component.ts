import {Component} from "@angular/core";
import {CategoryCreateDto} from "../../dto/category-create";
import {EnumEx} from "../../util/EnumEx";
import {LangCodeEnum} from "../../dto/language-code.enum";
import {TranslateService} from "ng2-translate";
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'category-create',
  templateUrl: './category-create.component.html',

})


export class CategoryCreateComponent {
  category: CategoryCreateDto;
  displayDialog = false;
  createMode = true;
  langCodes: Array<any>;

  constructor(private translate: TranslateService, private categoryService: CategoryService) {
  }

  private oldLangCode: string;

  changeContent(): void {
    this.oldLangCode = this.translate.currentLang;
    this.translate.use(LangCodeEnum[this.category.langCode].toLowerCase());
  }

  close(): void {
    this.displayDialog = false;
    this.translate.use(this.oldLangCode);
  }

  save(): void {
    this.categoryService.createCategory(this.category);
  }

  update(): void {

  }

  initializeForCreate(): void {
    this.langCodes = EnumEx.getDropDownArrayFromEnum(LangCodeEnum);
    const currentLang = LangCodeEnum[this.translate.currentLang.toUpperCase()];
    this.displayDialog = true;
    this.category = new CategoryCreateDto();
    this.category.langCode = currentLang;
  }



}
