import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatSnackBarModule } from '@angular/material';

import { SignInComponent } from './sign-in/sign-in.component';
import { AuthRouter } from './auth.router';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(AuthRouter)
    ],
    declarations: [SignInComponent]
})
export class AuthModule {
}
