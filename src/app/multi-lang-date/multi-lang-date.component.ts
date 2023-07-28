import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {DateAdapter} from '@angular/material';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Validators } from '@angular/forms';

export enum Languages {
  en = 'en',
  de = 'de',
  fr = 'fr',
  es = 'es',
}

@Component({
  selector: 'app-multi-lang-date',
  templateUrl: './multi-lang-date.component.html',
  styleUrls: ['./multi-lang-date.component.css']
})
export class MultiLangDateComponent implements OnInit{
  public selectedDate: Date = new Date();
  public dateControl = new FormControl(this.selectedDate, [Validators.required]);

  public languageList: string[] = [];

  constructor(private translate: TranslateService, private dateAdapter: DateAdapter<Date>) {}

  ngOnInit() {
    this.languageList = Object.keys(Languages).filter(String);
  }

  useLanguage(language: Languages): void {
    this.translate.use(language);
    this.dateAdapter.setLocale(language);
  }
}