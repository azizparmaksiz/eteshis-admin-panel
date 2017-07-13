import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DiseaseComponent} from './disease/disease.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {Http, HttpModule} from '@angular/http';
import {DiseaseService} from './disease/disease.service';
import {SymptomComponent} from './symptom/symptom.component';
import {DiseaseDetailComponent} from './disease/disease-detail.component';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import {AppMissingTranslationHandler} from './app-missing-translation-handler';
import {HomeComponent} from './home/home.component';
import {LoginModule} from './login/login.module';
import {AuthGuard} from './auth/auth-guard.service';
import {
  AccordionModule,
  ButtonModule,
  CodeHighlighterModule,
  DialogModule,
  EditorModule,
  TabViewModule
} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MedicaneComponent} from './medicane/medicane.component';

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
    DiseaseDetailComponent,
    HomeComponent,
    MedicaneComponent
  ],
  imports: [
    BrowserModule, FormsModule, CommonModule, ButtonModule, EditorModule, AccordionModule,
    DialogModule, TabViewModule, CodeHighlighterModule, BrowserAnimationsModule,
    RouterModule.forRoot(routes), HttpModule, LoginModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http],
    }),
  ],
  providers: [DiseaseService, AuthGuard,
    {provide: MissingTranslationHandler, useClass: AppMissingTranslationHandler}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
