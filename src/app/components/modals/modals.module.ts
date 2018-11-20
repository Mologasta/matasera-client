import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UploadImageComponent } from './upload-image/upload-image.component';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule
    ],
    declarations: [
        ConfirmationDialogComponent,
        UploadImageComponent
    ],
    exports: [
        ConfirmationDialogComponent,
        UploadImageComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent,
        UploadImageComponent
    ]
})
export class ModalsModule {
}
