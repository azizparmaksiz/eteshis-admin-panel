import {Component, ViewChild} from "@angular/core";
import {CategoryCreateComponent} from "./category-create/category-create.component";
import {LangCodeEnum} from "../dto/language-code.enum";
import {EnumEx} from "../util/EnumEx";
import {CategoryCreateDto} from "../dto/category-create";
import {CategoryTransCreateComponent} from "./category-trans-create/category-trans-create.component";
import {CategoryService} from "../service/category.service";
import {TranslateService} from "ng2-translate";
import {CategoryListDto} from "../dto/category-list";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',

})


export class CategoryComponent {

  @ViewChild(CategoryCreateComponent) catCreatComp:CategoryCreateComponent;
  @ViewChild(CategoryTransCreateComponent) catTransCreatComp:CategoryTransCreateComponent;

  categoryArray:Array<CategoryListDto>;

  constructor(private categoryService:CategoryService,private translate:TranslateService){

    const curLangCode=LangCodeEnum[this.translate.currentLang.toUpperCase()];
    categoryService.getAllCategories(curLangCode).then(cats=> this.categoryArray=cats);
  }

  langCodeEnumList = EnumEx.getNamesAndValues(LangCodeEnum);
  addCategory(){

    this.catCreatComp.initializeForCreate();
  }

  addTransCategory(langCode:LangCodeEnum, categoryId:number){

    this.catTransCreatComp.initializeForTransCreate(langCode);
  }
  showCategoryTrans(langCode:LangCodeEnum, categoryId:number){

    this.catTransCreatComp.initializeForTransCreate(langCode);
  }


  editCategory(catId: number): void {
  }

  deleteCategory(catId: number): void {
  }

}
