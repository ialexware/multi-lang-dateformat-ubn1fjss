import { Platform } from '@angular/cdk/platform';
import { DatePipe } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

export interface DateDisplay {
  year: string;
  month: string;
  day: string;
}

export const CUSTOM_DATE_FORMATS = {
  parse: {
   dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
display: {
   //dateInput: { month: 'short', year: 'numeric', day: 'numeric'},
   dateInput: 'customInput',
   monthYearLabel: {year: 'numeric', month: 'short'},
   dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
   monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};

export class CustomDatePickerAdapter extends NativeDateAdapter {

    override parse(value: string | number): Date | null {
        if (typeof value === 'string') {
            const formatter: any[] = new Intl.DateTimeFormat(this.locale).formatToParts();
            const delimiter = formatter.find((e) => e.type === 'literal').value;
            const format = this.getDateFormat();
            const newDate = this.stringToDate(value, format, delimiter);
            console.log(newDate);
            return newDate;
        }
        const timestamp: number = typeof value === 'number' ? value : Date.parse(value);
        console.log('value', value);
        console.log('timestamp', timestamp);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }

    private getDateFormat(date: Date = new Date()) {
        const formatter: any[] = new Intl.DateTimeFormat(this.locale).formatToParts(date);
        console.log(formatter);
        return formatter
            .map((e) => {
                switch (e.type) {
                    case 'month':
                        return 'MM';
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
    private stringToDate(_date: string, _format: string, _delimiter: string) {
        const formatLowerCase = _format.toLowerCase();
        const formatItems = formatLowerCase.split(_delimiter);
        const dateItems = _date.split(_delimiter);
        const monthIndex = formatItems.indexOf('mm');
        const dayIndex = formatItems.indexOf('dd');
        const yearIndex = formatItems.indexOf('yyyy');
        let month = parseInt(dateItems[monthIndex], 10);
        month -= 1;
        const formatedDate = new Date(+dateItems[yearIndex], month, +dateItems[dayIndex]);
        return formatedDate;
    }
}