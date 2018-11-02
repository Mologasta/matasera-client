import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const AppRouter: Routes = [
    {
        path: '',
        children: [
            {
                path: 'sign-in',
                loadChildren: 'app/views/auth/auth.module#AuthModule'
            },
            {
                path: '',
                loadChildren: 'app/views/dashboard/dashboard.module#DashboardModule',
                canActivate: [AuthGuard]
            },
            {
                path: '**',
                redirectTo: 'sign-in',
                pathMatch: 'full'
            }
        ]
    }
];
