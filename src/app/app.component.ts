import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from "./service/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private translate: TranslateService, private activatedRoute: ActivatedRoute) {
    translate.addLangs(['en', 'tr', 'fr', 'ar', 'ru']);
    translate.setDefaultLang('tr');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|tr|fr|ar|ru/) ? browserLang : 'tr');

  }

  changeLanguage(lang) {
    this.translate.use(lang);
  }

  ngOnInit() {
    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        const locale = param['locale'];
        if (locale !== undefined) {
          this.translate.use(locale);
        }
      });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }
}
