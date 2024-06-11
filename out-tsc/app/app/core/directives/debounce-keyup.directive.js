import { __decorate } from "tslib";
import { Directive, HostListener } from "@angular/core";
import { AbstractDebounceDirective } from "./abstact-debounce.directive";
let DebounceKeyupDirective = class DebounceKeyupDirective extends AbstractDebounceDirective {
    constructor() {
        super();
    }
    onKeyUp(event) {
        event.preventDefault();
        this.emitEvent$.next(event);
    }
};
__decorate([
    HostListener("keyup", ["$event"])
], DebounceKeyupDirective.prototype, "onKeyUp", null);
DebounceKeyupDirective = __decorate([
    Directive({
        selector: "[debounceKeyUp]"
    })
], DebounceKeyupDirective);
export { DebounceKeyupDirective };
//# sourceMappingURL=debounce-keyup.directive.js.map