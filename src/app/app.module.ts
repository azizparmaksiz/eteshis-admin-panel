import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DiseaseComponent} from './disease/disease.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {Http, HttpModule} from '@angular/http';
import {DiseaseService} from './service/disease.service';
import {SymptomComponent} from './symptom/symptom.component';
import {DiseaseCreateComponent} from './disease/disease-create/disease-create.component';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import {AppMissingTranslationHandler} from './app-missing-translation-handler';
import {HomeComponent} from './home/home.component';
import {LoginModule} from './login/login.module';
import {AuthGuard} from './auth/auth-guard.service';

import {CommonModule} from '@angular/common';
import {MedicaneComponent} from './medicane/medicane.component';
import {CategoryService} from './service/category.service';
import {AgeRangeService} from './service/age-range.service';
import {MedicalTestService} from './service/medicalTest.service';
import {SharedService} from "./service/shared.service";
import {DiseaseTransCreateComponent} from "./disease/disease-trans-create/disease-trans-create.component";
import {DiseaseTransDetailComponent} from "./disease/disease-trans-detail/disease-trans-detail.component";
import {SymptomService} from "./service/symptom.service";
import {PrimeNgRootModule} from "./prime-ng-root.module";
import {CategoryComponent} from "./category/category.component";
import {CategoryCreateComponent} from "./category/category-create/category-create.component";
import {CategoryTransCreateComponent} from "./category/category-trans-create/category-trans-create.component";

const routes: Routes = [

  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'disease', component: DiseaseComponent},
      {path: 'symptom', component: SymptomComponent},
      {path: 'category', component: CategoryComponent}
    ],
    canActivate: [AuthGuard]
  },
];

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SymptomComponent,
    MedicaneComponent,
    DiseaseComponent,
    DiseaseCreateComponent,
    DiseaseTransCreateComponent,
    DiseaseTransDetailComponent,
    CategoryComponent,
    CategoryCreateComponent,
    CategoryTransCreateComponent,
  ],
  imports: [
    BrowserModule, FormsModule, CommonModule,
    PrimeNgRootModule,
    RouterModule.forRoot(routes), HttpModule, LoginModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http],
    }),
  ],
  providers: [DiseaseService, AuthGuard,
    CategoryService, AgeRangeService, MedicalTestService, SymptomService,
    {provide: MissingTranslationHandler, useClass: AppMissingTranslationHandler}, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
