import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let StoutItemComponent = class StoutItemComponent {
};
__decorate([
    Input()
], StoutItemComponent.prototype, "item", void 0);
StoutItemComponent = __decorate([
    Component({
        standalone: true,
        selector: 'app-stout-item',
        template: "I'm a little {{item.name}}, short and stout!",
    })
], StoutItemComponent);
export { StoutItemComponent };
let BestItemComponent = class BestItemComponent {
};
__decorate([
    Input()
], BestItemComponent.prototype, "item", void 0);
BestItemComponent = __decorate([
    Component({
        standalone: true,
        selector: 'app-best-item',
        template: 'This is the brightest {{item.name}} in town.',
    })
], BestItemComponent);
export { BestItemComponent };
let DeviceItemComponent = class DeviceItemComponent {
};
__decorate([
    Input()
], DeviceItemComponent.prototype, "item", void 0);
DeviceItemComponent = __decorate([
    Component({
        standalone: true,
        selector: 'app-device-item',
        template: 'Which is the slimmest {{item.name}}?',
    })
], DeviceItemComponent);
export { DeviceItemComponent };
let LostItemComponent = class LostItemComponent {
};
__decorate([
    Input()
], LostItemComponent.prototype, "item", void 0);
LostItemComponent = __decorate([
    Component({
        standalone: true,
        selector: 'app-lost-item',
        template: 'Has anyone seen my {{item.name}}?',
    })
], LostItemComponent);
export { LostItemComponent };
let UnknownItemComponent = class UnknownItemComponent {
    get message() {
        return this.item && this.item.name
            ? `${this.item.name} is strange and mysterious.`
            : 'A mystery wrapped in a fishbowl.';
    }
};
__decorate([
    Input()
], UnknownItemComponent.prototype, "item", void 0);
UnknownItemComponent = __decorate([
    Component({
        standalone: true,
        selector: 'app-unknown-item',
        template: '{{message}}',
    })
], UnknownItemComponent);
export { UnknownItemComponent };
export const ItemSwitchComponents = [
    StoutItemComponent,
    BestItemComponent,
    DeviceItemComponent,
    LostItemComponent,
    UnknownItemComponent,
];
//# sourceMappingURL=item-switch.component.js.map