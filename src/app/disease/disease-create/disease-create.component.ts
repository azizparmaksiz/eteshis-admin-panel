/**
 * Created by seva on 7/10/17.
 */
import {Component} from "@angular/core";
import {DiseaseCreateDto} from "../../dto/disease-create";
import {DiseaseService} from "../../service/disease.service";
import "rxjs/add/operator/switchMap";
import {EnumEx} from "../../util/EnumEx";
import {GenderEnum} from "../../dto/gender.enum";
import {LangCodeEnum} from "../../dto/language-code.enum";
import {CategoryService} from "../../service/category.service";
import {AgeRangeService} from "../../service/age-range.service";
import {MedicalTestService} from "../../service/medicalTest.service";
import {DiseaseUpdateDto} from "../../dto/disease-update";
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'disease-create',
  templateUrl: './disease-create.component.html',

})


export class DiseaseCreateComponent {
  displayDialog = false;
  createMode = true;
  disease: any;

  categories: Array<any>;
  medicalTests: Array<any>;
  ageRanges: Array<any>;
  langCodes: Array<any>;

  genders: Array<any>;


  constructor(private diseaseService: DiseaseService, private categoryService: CategoryService,
              private ageRangeService: AgeRangeService, private medicalTesService: MedicalTestService,
              private translate: TranslateService) {


  }

  private getCategories(langCodeId:number): Array<any> {
    const items: any[] = [];
    this.categoryService.getAllCategories(langCodeId).then(cats => {
      cats.forEach(pair => {
        const prodType = {'label': pair.categoryName, 'value': pair.categoryId.toString()};
        items.push(prodType);
      });
    });

    return items;
  }

  private getAgeRanges(): Array<any> {
    const items: any[] = [];
    this.ageRangeService.getAllAgeRanges().then(cats => {
      cats.forEach(pair => {
        const prodType = {'label': pair.categoryName, 'value': pair.id.toString()};
        items.push(prodType);
      });
    });

    return items;
  }

  private getMedicalTests(langCodeId:number): Array<any> {
    const items: any[] = [];
    this.medicalTesService.getAllMedicalTests(langCodeId).then(cats => {
      cats.forEach(pair => {
        const prodType = {'label': pair.categoryName, 'value': pair.id.toString()};
        items.push(prodType);
      });
    });

    return items;
  }

private initializeCommon(){
  this.genders = EnumEx.getDropDownArrayFromEnum(GenderEnum);
  this.langCodes = EnumEx.getDropDownArrayFromEnum(LangCodeEnum);
  const currentLang=LangCodeEnum[this.translate.currentLang.toUpperCase()];
  this.categories = this.getCategories(currentLang);
  this.ageRanges = this.getAgeRanges();
  this.medicalTests = this.getMedicalTests(currentLang);
}
  initializeDiseaseForCreate(): void {
    this.initializeCommon();
    this.disease = new DiseaseCreateDto();
    this.disease.langCode=LangCodeEnum[this.translate.currentLang.toUpperCase()];
    this.displayDialog = true;
  }

  initializeDiseaseForUpdate(diseaseId:number): void {
  // get DiseaseUpdateDto from server with diseaseId
   this.disease = new DiseaseUpdateDto();

    this.initializeCommon();
    this.displayDialog = true;
    this.createMode = false;
  }

  save(): void {
    this.diseaseService.createDisease(this.disease);
  }

  update(): void {
   this.diseaseService.updateDisease(this.disease);
  }

  close(): void {
    this.displayDialog = false;
    this.translate.use(LangCodeEnum[this.oldLang].toLowerCase());
  }

  oldLang:LangCodeEnum;
  changeContent():void{
    this.oldLang=LangCodeEnum[this.translate.currentLang.toUpperCase()];
    this.translate.use(LangCodeEnum[this.disease.langCode].toLowerCase());
    this.categories = this.getCategories(this.disease.langCode);
    this.medicalTests = this.getMedicalTests(this.disease.langCode);
  }
}

