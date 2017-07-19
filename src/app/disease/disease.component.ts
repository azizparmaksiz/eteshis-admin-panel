import {Component, OnInit, ViewChild} from "@angular/core";
import {DiseaseService} from "../service/disease.service";
import {Subject} from "rxjs/Subject";
// Observable class extensions
import "rxjs/add/observable/of";
// Observable operators
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {DiseaseCreateComponent} from "./disease-create/disease-create.component";
import {EnumEx} from "../util/EnumEx";
import {LangCodeEnum} from "../dto/language-code.enum";
import {DiseaseTransCreateComponent} from "./disease-trans-create/disease-trans-create.component";
import {DiseaseTransDetailComponent} from "./disease-trans-detail/disease-trans-detail.component";
import {DiseaseTransDetail} from "../dto/disease-trans-detail";
import {DiseaseList} from "../dto/disease-list";
@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease-create.component.css']
})
export class DiseaseComponent implements OnInit {


  @ViewChild(DiseaseCreateComponent) diseaseCreateComponent: DiseaseCreateComponent;
  @ViewChild(DiseaseTransCreateComponent) diseaseTransCreateComponent: DiseaseTransCreateComponent;
  @ViewChild(DiseaseTransDetailComponent) diseaseTransDetailComponent: DiseaseTransDetailComponent;
  langCodeEnumList = EnumEx.getNamesAndValues(LangCodeEnum);

  selectedCategoryIdList:Array<any>;
  selectedAgeRangeIdList:Array<any>;

  categories: Array<any>;// for filtering diseaseTransCreate
  ageRanges: Array<any>;// for filtering diseaseTransCreate

  diseaseArray: any[] = [ // TODO: this is for test pet get diseaseTransCreate list from server
    {diseaseId: 10, diseaseName: 'vin', categoryList: [{'categoryName': 'ali'}]},
  ];
   // diseaseArray: DiseaseList[];
  private searchTerms = new Subject<string>();


  constructor(private diseaseService: DiseaseService) {
  }


  ngOnInit(): void {

  }


  addDisease(): void {
    this.diseaseCreateComponent.initializeDiseaseForCreate();
  }

  editDisease(diseaseId: number): void {
    this.diseaseCreateComponent.initializeDiseaseForUpdate(diseaseId);
  }

  deleteDisease(diseaseId: number): void {
    this.diseaseService.deletedisease(diseaseId);
  }

  addTransForDisease(langId: number, diseaseID: number): void {
    this.diseaseTransCreateComponent.initializeDiseaseTransForCreate(langId, diseaseID);
  }

  showDiseaseTrans(langId: number, diseaseID: number): void {
    this.diseaseTransDetailComponent.initializeTransDisease(langId, diseaseID);
  }

  editDiseaseTrans(transDetail: DiseaseTransDetail) {
    this.diseaseTransCreateComponent.initializeDiseaseTransForUpdate(transDetail);
  }
}
