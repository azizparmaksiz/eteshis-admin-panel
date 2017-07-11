/**
 * Created by seva on 7/10/17.
 */
import {MissingTranslationHandler, MissingTranslationHandlerParams} from 'ng2-translate';

export class AppMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    console.log(params);
    return 'Translations not available for ' + params.key;
  }
}
