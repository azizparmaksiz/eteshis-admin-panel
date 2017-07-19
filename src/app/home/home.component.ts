import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {EnumEx} from "../util/EnumEx";
import {LangCodeEnum} from "../dto/language-code.enum";
import {SharedService} from "../service/shared.service";
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  langCode:LangCodeEnum;
  langCodeArray: Array<any> = EnumEx.getDropDownArrayFromEnum(LangCodeEnum);

  constructor(private autService: AuthService, public router: Router, private translate: TranslateService) {
  }

  ngOnInit() {
    this.langCode=LangCodeEnum[this.translate.currentLang.toUpperCase()];
  }

  logOut(): void {
    this.autService.logout();
    this.router.navigate(['login']);
  }

   changeLang(){
    this.translate.use(LangCodeEnum[this.langCode].toLowerCase());
   }

}
