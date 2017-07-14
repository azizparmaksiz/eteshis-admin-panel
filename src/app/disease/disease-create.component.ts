/**
 * Created by seva on 7/10/17.
 */
import {Component} from '@angular/core';
import {Disease} from '../dto/disease';
import {DiseaseService} from '../service/disease.service';
import 'rxjs/add/operator/switchMap';
import {DiseaseEnum} from './disease.enum';
import {EnumEx} from '../util/EnumEx';
import {GenderEnum} from '../dto/gender.enum';
import {LangCodeEnum} from '../dto/language-code.enum';
import {CategoryService} from '../service/category.service';
import {AgeRangeService} from '../service/age-range.service';
import {MedicalTestService} from '../service/medicalTest.service';

@Component({
  selector: 'disease-detail',
  templateUrl: './disease-create.component.html',
  styleUrls: ['./disease-create.component.css']
})


export class DiseaseCreateComponent {
  displayDialog = false;
  diseaseDetailMode = DiseaseEnum.editMode;
  disease: Disease;

  categories: Array<any>;
  medicalTests: Array<any>;
  ageRanges: Array<any>;
  langCodes: Array<any>;

  genders: Array<any>;


  constructor(private diseaseService: DiseaseService, private categoryService: CategoryService,
              private ageRangeService: AgeRangeService, private medicalTesService: MedicalTestService) {
    this.disease = new Disease();
    this.genders = this.getDropDownArrayFromEnum(GenderEnum);
    this.langCodes = this.getDropDownArrayFromEnum(LangCodeEnum);
    this.categories = this.getCategories();
    this.ageRanges = this.getAgeRanges();
    this.medicalTests = this.getMedicalTests();
  }

  private getCategories(): Array<any> {
    const items: any[] = [];
    this.categoryService.getAllCategories().then(cats => {
      cats.forEach(pair => {
        const prodType = {'label': pair.categoryName, 'value': pair.id.toString()};
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

  private getMedicalTests(): Array<any> {
    const items: any[] = [];
    this.medicalTesService.getAllMedicalTests().then(cats => {
      cats.forEach(pair => {
        const prodType = {'label': pair.categoryName, 'value': pair.id.toString()};
        items.push(prodType);
      });
    });

    return items;
  }

  private getDropDownArrayFromEnum(e: any): Array<any> {
    const prodTypes: any[] = [];

    const prodTypeEnumList = EnumEx.getNamesAndValues(e);

    prodTypeEnumList.forEach(pair => {
      const prodType = {'label': pair.name, 'value': pair.value.toString()};
      prodTypes.push(prodType);
    });

    return prodTypes;
  }

  initializeDisease(id: number, initializeMode: DiseaseEnum): void {
    this.diseaseDetailMode = initializeMode;
    if (initializeMode === DiseaseEnum.createMode) {
      this.disease = new Disease();
    } else {
      this.diseaseService.getDisease(id).then(disease => this.disease = disease);
    }
    this.displayDialog = true;
  }

  save(): void {
    this.diseaseService.updateDisease(this.disease);
  }

  update(): void {
    this.diseaseService.createDisease(this.disease);
  }

  close(): void {
    this.displayDialog = false;
  }
}

