import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material';
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
  styleUrls: ['./multi-lang-date.component.css'],
})
export class MultiLangDateComponent implements OnInit {
  public selectedDate: Date = new Date();
  public dateControl = new FormControl(this.selectedDate, [
    Validators.required,
  ]);

  public languageList: string[] = [];
  /**
   * Getter and setter for the minimum date which is available for selection.
   */
  @Input() get minDate(): Date | undefined {
    return this.minLocalDate!;
  }
  /**
   * Setter for the minimum date which is available for selection.
   */
  set minDate(value: Date | undefined) {
    if (value) {
      value?.setHours(0, 0, 0, 0);
      if (value !== this.minLocalDate) {
        this.minLocalDate = value;
        this.dateControl.updateValueAndValidity();
      }
    }
  }

  /**
   * Getter and setter for the maximum date which is available for selection.
   */
  @Input() get maxDate(): Date | undefined {
    return this.maxLocalDate!;
  }

  /**
   * Setter for the maximum date which is available for selection.
   */
  set maxDate(value: Date | undefined) {
    if (value) {
      value?.setHours(0, 0, 0, 0);
      if (value !== this.maxLocalDate) {
        this.maxLocalDate = value;
        this.dateControl.updateValueAndValidity();
      }
    }
  }
  /**
   * Min date to ensure that the date provided to 'ngx-bootstrap/datepicker' has no hours.
   */
  public minLocalDate?: Date;

  /**
   * Max date to ensure that the date provided to 'ngx-bootstrap/datepicker' has no hours.
   */
  public maxLocalDate?: Date;

  public placeholder = '';
  constructor(
    private translate: TranslateService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.placeholder = this.getDateFormat()
  }

  ngOnInit() {
    this.languageList = Object.keys(Languages).filter(String);
  }

  useLanguage(language: Languages): void {
    this.translate.use(language);
    this.dateAdapter.setLocale(language);
  }

  /**
   * Return the date formatted
   * @param {String} date Date to format
   * @returns A string with the date formatted according to the locale
   */
  public formatDate(date: Date): string {
    return Intl.DateTimeFormat(navigator.language).format(date);
  }


    /**
     * Get the date format according to the user configuration language using the Intl API
     * as the MatNativeDateModule does.
     * @returns {string} Returns the date format according to the user configuration language
     */
     getDateFormat() {
      const formatter = new Intl.DateTimeFormat(this.language).formatToParts();
      return formatter
          .map((e) => {
              switch (e.type) {
                  case 'month':
                      return 'mm';
                  case 'day':
                      return 'dd';
                  case 'year':
                      return 'yyyy';
                  default:
                      return e.value;
              }
          })
          .join('');
  }
}
