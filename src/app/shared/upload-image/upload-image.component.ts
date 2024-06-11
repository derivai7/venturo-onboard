import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {
    readonly DEFAULT_RATIO_HIGH = 4;
    readonly DEFAULT_RATIO_WIDTH = 3;
    readonly DEFAULT_IMAGE_QUALITY = 90;

    @Input() ratioHigh: any;
    @Input() ratioWidth: any;
    @Input() imageQuality: any;
    @Input() defaultImage: any;
    @Output() onSubmit = new EventEmitter<any>();

    modalCrop: any;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    imageUrl: string;

    config: {
        ratioHigh: any,
        ratioWidth: any,
        imageQuality: any,
    }

    constructor(
        private modalService: NgbModal) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.config = {
            ratioHigh: this.ratioHigh ?? this.DEFAULT_RATIO_HIGH,
            ratioWidth: this.ratioWidth ?? this.DEFAULT_RATIO_WIDTH,
            imageQuality: this.imageQuality ?? this.DEFAULT_IMAGE_QUALITY
        }

        if (this.defaultImage && this.defaultImage.length > 0) {
            this.imageUrl = this.defaultImage;
        }
    }

    dragOverHandler(event: DragEvent) {
        event.preventDefault();
    }

    dropHandler(event: DragEvent, modalId) {
        event.preventDefault();

        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
            const fileEvent = { target: { files: event.dataTransfer.files } };
            this.fileChangeEvent(fileEvent, modalId);
        }
    }

    fileChangeEvent(event: any, modalId): void {
        this.imageChangedEvent = event;
        this.openModal(modalId)
    }

    openModal(modalId) {
        this.modalCrop = this.modalService.open(modalId, {size: 'lg', backdrop: 'static'});
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }

    submit() {
        this.imageUrl = this.croppedImage;
        this.onSubmit.emit(this.croppedImage);
        this.modalCrop.close();
    }
}
