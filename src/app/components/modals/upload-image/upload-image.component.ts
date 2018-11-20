import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ConfirmationInterface } from '../../../interfaces/confirmation.interface';
import { NotifierService } from '../../../services/notifier.service';
import { imageTypes, imagePlaceholder } from '../../../app.constants';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
    public imgPreview: string;

    constructor(public dialog: MatDialogRef<UploadImageComponent>, private notification: NotifierService,
                @Inject(MAT_DIALOG_DATA) public data: ConfirmationInterface) {
        this.imgPreview = imagePlaceholder
    }

    ngOnInit() {
    }

    public onCancelClick(): void {
        this.dialog.close(false);
    }

    public initPreview(data): void {
        const files: FileList = data.files;
        const imgFile: File   = files[0];

        if (imgFile) {
            if (!imageTypes.includes(imgFile.type) ) {
                this.notification.error('wrong file format');
                return;
            }

            this.setPreview(imgFile)
        }
    }

    public uploadClick(data): void {
        const files: FileList = data.files;
        const imgFile: File   = files[0];
        this.dialog.close(imgFile);
    }

    private setPreview(imgFile?): void {

        const reader: FileReader = new FileReader();

        reader.readAsDataURL(imgFile );
        reader.onload = ( event: any ): void => {
            this.imgPreview = event.target.result;
        };
    }

}
