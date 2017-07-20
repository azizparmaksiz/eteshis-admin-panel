import {NgModule} from "@angular/core";
import {
  AccordionModule,
  ButtonModule,
  CheckboxModule,
  CodeHighlighterModule,
  DataTableModule,
  DialogModule,
  DropdownModule, EditorModule,
  MultiSelectModule, SharedModule,
  SpinnerModule,
  TabViewModule
} from "primeng/primeng";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GrowlModule} from "primeng/components/growl/growl";

@NgModule({
  exports: [
    DialogModule, TabViewModule,
    CodeHighlighterModule, BrowserAnimationsModule,
    DropdownModule, MultiSelectModule, SharedModule,
    DataTableModule, CheckboxModule, SpinnerModule,
    ButtonModule, EditorModule, AccordionModule, GrowlModule,
  ],
})
export class PrimeNgRootModule {
}
