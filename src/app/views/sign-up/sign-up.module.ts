import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';

import { SignUpComponent } from './form/form.component';
import { Router } from './sign-up.router';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(Router)
    ],
    declarations: [SignUpComponent]
})
export class SignUpModule {
}
