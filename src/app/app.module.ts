import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatRadioModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {CUSTOM_DATE_FORMATS, CustomDatePickerAdapter} from './shared/date-adapter';

import {registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { MultiLangDateComponent } from './multi-lang-date/multi-lang-date.component';
registerLocaleData(localeEn, 'en');
registerLocaleData(localeDe, 'de', localeDeExtra);
registerLocaleData(localeFr, 'fr', localeFrExtra);
registerLocaleData(localeEs, 'es', localeEsExtra);

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/i18n/general/', suffix: '.json'}
  ]);
}

@NgModule({
  imports:      [ 
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    FlexLayoutModule,
    /* Material imports*/
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule
    ],
  declarations: [AppComponent, MultiLangDateComponent],
  providers: [
    {provide: DateAdapter, useClass: CustomDatePickerAdapter},
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS}
  ],
  bootstrap:    [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
    constructor(private translate: TranslateService) {
      translate.addLangs(['en', 'de', 'fr', 'es']);
      translate.setDefaultLang('en');
      translate.use('en');
    }
}
