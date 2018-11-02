import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { AppRouter } from './app.router';
import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';
import { NotifierService } from './services/notifier.service';
import { AuthGuard } from './guards/auth.guard';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { ResponseErrorInterceptor } from './interceptors/response-error.interceptor';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRouter),
        SimpleNotificationsModule.forRoot(),
        HttpClientModule
    ],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefreshTokenInterceptor,
            multi: true
        },
        SessionService,
        NotificationsService,
        NotifierService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
