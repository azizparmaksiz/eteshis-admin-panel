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
import {
  AccordionModule,
  ButtonModule,
  CheckboxModule,
  CodeHighlighterModule, DataTableModule,
  DialogModule,
  DropdownModule,
  EditorModule,
  MultiSelectModule, SharedModule,
  SpinnerModule,
  TabViewModule
} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MedicaneComponent} from './medicane/medicane.component';
import {CategoryService} from './service/category.service';
import {AgeRangeService} from './service/age-range.service';
import {MedicalTestService} from './service/medicalTest.service';

const routes: Routes = [

  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'diseases', component: DiseaseComponent}
    ],
    //canActivate: [AuthGuard]
  },
];
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    DiseaseComponent,
    SymptomComponent,
    DiseaseCreateComponent,
    HomeComponent,
    MedicaneComponent
  ],
  imports: [
    BrowserModule, FormsModule, CommonModule, ButtonModule, EditorModule, AccordionModule,
    DialogModule, TabViewModule, CodeHighlighterModule, BrowserAnimationsModule, DropdownModule,
    MultiSelectModule, DataTableModule, SharedModule,
    RouterModule.forRoot(routes), HttpModule, LoginModule, CheckboxModule, SpinnerModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http],
    }),
  ],
  providers: [DiseaseService, AuthGuard, CategoryService, AgeRangeService, MedicalTestService,
    {provide: MissingTranslationHandler, useClass: AppMissingTranslationHandler}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
