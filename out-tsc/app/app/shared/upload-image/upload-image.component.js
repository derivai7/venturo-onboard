import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let UploadImageComponent = class UploadImageComponent {
    constructor(modalService) {
        this.modalService = modalService;
        this.DEFAULT_RATIO_HIGH = 4;
        this.DEFAULT_RATIO_WIDTH = 3;
        this.DEFAULT_IMAGE_QUALITY = 90;
        this.onSubmit = new EventEmitter();
        this.imageChangedEvent = '';
        this.croppedImage = '';
    }
    ngOnChanges(changes) {
        this.config = {
            ratioHigh: this.ratioHigh ?? this.DEFAULT_RATIO_HIGH,
            ratioWidth: this.ratioWidth ?? this.DEFAULT_RATIO_WIDTH,
            imageQuality: this.imageQuality ?? this.DEFAULT_IMAGE_QUALITY
        };
        if (this.defaultImage && this.defaultImage.length > 0) {
            this.imageUrl = this.defaultImage;
        }
    }
    dragOverHandler(event) {
        event.preventDefault();
    }
    dropHandler(event, modalId) {
        event.preventDefault();
        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
            const fileEvent = { target: { files: event.dataTransfer.files } };
            this.fileChangeEvent(fileEvent, modalId);
        }
    }
    fileChangeEvent(event, modalId) {
        this.imageChangedEvent = event;
        this.openModal(modalId);
    }
    openModal(modalId) {
        this.modalCrop = this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
    }
    imageCropped(event) {
        this.croppedImage = event.base64;
    }
    submit() {
        this.imageUrl = this.croppedImage;
        this.onSubmit.emit(this.croppedImage);
        this.modalCrop.close();
    }
};
__decorate([
    Input()
], UploadImageComponent.prototype, "ratioHigh", void 0);
__decorate([
    Input()
], UploadImageComponent.prototype, "ratioWidth", void 0);
__decorate([
    Input()
], UploadImageComponent.prototype, "imageQuality", void 0);
__decorate([
    Input()
], UploadImageComponent.prototype, "defaultImage", void 0);
__decorate([
    Output()
], UploadImageComponent.prototype, "onSubmit", void 0);
UploadImageComponent = __decorate([
    Component({
        selector: 'app-upload-image',
        templateUrl: './upload-image.component.html',
        styleUrls: ['./upload-image.component.scss']
    })
], UploadImageComponent);
export { UploadImageComponent };
//# sourceMappingURL=upload-image.component.js.map