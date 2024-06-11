import { __decorate } from "tslib";
import { Directive, Input, Output, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil, debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
let AbstractDebounceDirective = class AbstractDebounceDirective {
    constructor() {
        this.debounceTime = 1000;
        this.onEvent = new EventEmitter();
        this.emitEvent$ = new Subject();
        this.subscription$ = new Subject();
    }
    ngOnInit() {
        this.emitEvent$
            .pipe(takeUntil(this.subscription$), debounceTime(this.debounceTime), distinctUntilChanged(), tap(value => this.emitChange(value)))
            .subscribe();
    }
    emitChange(value) {
        this.onEvent.emit(value);
    }
    ngOnDestroy() {
        this.subscription$.next();
        this.subscription$.complete();
    }
};
__decorate([
    Input()
], AbstractDebounceDirective.prototype, "debounceTime", void 0);
__decorate([
    Output()
], AbstractDebounceDirective.prototype, "onEvent", void 0);
AbstractDebounceDirective = __decorate([
    Directive()
], AbstractDebounceDirective);
export { AbstractDebounceDirective };
//# sourceMappingURL=abstact-debounce.directive.js.map