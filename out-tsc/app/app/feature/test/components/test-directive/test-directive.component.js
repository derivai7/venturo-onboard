import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from './item';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemSwitchComponents, StoutItemComponent } from './item-switch.component';
let TestDirectiveComponent = class TestDirectiveComponent {
    constructor() {
        this.canSave = true;
        this.isSpecial = true;
        this.isUnchanged = true;
        this.isActive = true;
        this.nullCustomer = null;
        this.currentCustomer = {
            name: 'Laura',
        };
        this.items = [];
        // trackBy change counting
        this.itemsNoTrackByCount = 0;
        this.itemsWithTrackByCount = 0;
        this.itemsWithTrackByCountReset = 0;
        this.itemIdIncrement = 1;
        this.currentClasses = {};
        this.currentStyles = {};
    }
    ngOnInit() {
        this.resetItems();
        this.setCurrentClasses();
        this.setCurrentStyles();
        this.itemsNoTrackByCount = 0;
    }
    setUppercaseName(name) {
        this.currentItem.name = name.toUpperCase();
    }
    setCurrentClasses() {
        // CSS classes: added/removed per current state of component properties
        this.currentClasses = {
            saveable: this.canSave,
            modified: !this.isUnchanged,
            special: this.isSpecial,
        };
    }
    setCurrentStyles() {
        // CSS styles: set per current state of component properties
        this.currentStyles = {
            'font-style': this.canSave ? 'italic' : 'normal',
            'font-weight': !this.isUnchanged ? 'bold' : 'normal',
            'font-size': this.isSpecial ? '24px' : '12px',
        };
    }
    isActiveToggle() {
        this.isActive = !this.isActive;
    }
    giveNullCustomerValue() {
        this.nullCustomer = 'Kelly';
    }
    resetItems() {
        this.items = Item.items.map((item) => item.clone());
        this.currentItem = this.items[0];
        this.item = this.currentItem;
    }
    resetList() {
        this.resetItems();
        this.itemsWithTrackByCountReset = 0;
        this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
    }
    changeIds() {
        this.items.forEach((i) => (i.id += this.itemIdIncrement));
        this.itemsWithTrackByCountReset = -1;
        this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
        this.itemsWithTrackByCount = ++this.itemsWithTrackByCount;
    }
    clearTrackByCounts() {
        this.resetItems();
        this.itemsNoTrackByCount = 0;
        this.itemsWithTrackByCount = 0;
        this.itemIdIncrement = 1;
    }
    trackByItems(index, item) {
        return item.id;
    }
    trackById(index, item) {
        return item.id;
    }
    getValue(event) {
        return event.target.value;
    }
};
TestDirectiveComponent = __decorate([
    Component({
        standalone: true,
        selector: 'app-root',
        templateUrl: './test-directive.component.html',
        styleUrls: ['./test-directive.component.css'],
        imports: [
            CommonModule,
            FormsModule,
            ItemDetailComponent,
            ItemSwitchComponents,
            StoutItemComponent,
        ],
    })
], TestDirectiveComponent);
export { TestDirectiveComponent };
//# sourceMappingURL=test-directive.component.js.map