import { Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';

export const AuthRouter: Routes = [
    {
        path: '',
        component: SignInComponent
    }
];
