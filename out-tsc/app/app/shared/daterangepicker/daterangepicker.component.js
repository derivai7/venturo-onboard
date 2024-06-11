import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
let DaterangepickerComponent = class DaterangepickerComponent {
    constructor(dateRangePickerOptions) {
        this.dateRangePickerOptions = dateRangePickerOptions;
        this.FORMAT = 'DD/MM/YYYY';
        this.FORMAT_MODEL = 'YYYY-MM-DD';
        this.onChange = new EventEmitter();
        this.dateRangePickerOptions.settings = {
            locale: {
                format: this.FORMAT
            },
            alwaysShowCalendars: true,
        };
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        this.model = {
            placeholder: '',
            startDate: moment().format(this.FORMAT),
            endDate: moment().format(this.FORMAT),
            showRange: false,
            daterange: ''
        };
        if (this.startDate) {
            this.model.startDate = this.startDate;
        }
        else {
            this.model.startDate = null;
        }
        if (this.endDate) {
            this.model.endDate = this.endDate;
        }
        else {
            this.model.endDate = null;
        }
        if (this.placeholder) {
            this.model.placeholder = this.placeholder;
        }
        if (this.showRanges) {
            this.appendRangeConfiguration();
        }
        if (this.single) {
            this.dateRangePickerOptions.settings.singleDatePicker = true;
        }
        this.setDefaultValue();
    }
    setDefaultValue() {
        if (!this.model.startDate && !this.model.endDate) {
            this.model.daterange = '';
            return false;
        }
        const { startDate, endDate } = this.model;
        this.model.daterange = moment(startDate).format(this.FORMAT) + ' - ' + moment(endDate).format(this.FORMAT);
    }
    selectedDate($event) {
        this.onChange.emit({
            startDate: moment($event.start).format(this.FORMAT_MODEL),
            endDate: moment($event.end).format(this.FORMAT_MODEL)
        });
    }
    appendRangeConfiguration() {
        this.dateRangePickerOptions.settings.ranges = {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        };
    }
    clearDateRange() {
        this.model.daterange = '';
        this.onChange.emit({ startDate: '', endDate: '' });
    }
};
__decorate([
    Input()
], DaterangepickerComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "startDate", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "endDate", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "showRanges", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "isFilter", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "single", void 0);
__decorate([
    Input()
], DaterangepickerComponent.prototype, "disabled", void 0);
__decorate([
    Output()
], DaterangepickerComponent.prototype, "onChange", void 0);
DaterangepickerComponent = __decorate([
    Component({
        selector: 'app-daterangepicker',
        templateUrl: './daterangepicker.component.html',
        styleUrls: ['./daterangepicker.component.scss']
    })
], DaterangepickerComponent);
export { DaterangepickerComponent };
//# sourceMappingURL=daterangepicker.component.js.map