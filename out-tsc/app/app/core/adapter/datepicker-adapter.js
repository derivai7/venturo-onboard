import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
let CustomAdapter = class CustomAdapter extends NgbDateAdapter {
    constructor() {
        super(...arguments);
        this.DELIMITER = '-';
    }
    fromModel(value) {
        if (value) {
            const date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[2], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[0], 10),
            };
        }
        return null;
    }
    toModel(date) {
        return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + (date.day < 10 ? `0${date.day}` : date.day) : null;
    }
};
CustomAdapter = __decorate([
    Injectable()
], CustomAdapter);
export { CustomAdapter };
/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
let CustomDateParserFormatter = class CustomDateParserFormatter extends NgbDateParserFormatter {
    constructor() {
        super(...arguments);
        this.DELIMITER = '/';
    }
    parse(value) {
        if (value) {
            const date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[2], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[0], 10),
            };
        }
        return null;
    }
    format(date) {
        return date ? (date.day < 10 ? `0${date.day}` : date.day) + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
    }
};
CustomDateParserFormatter = __decorate([
    Injectable()
], CustomDateParserFormatter);
export { CustomDateParserFormatter };
//# sourceMappingURL=datepicker-adapter.js.map