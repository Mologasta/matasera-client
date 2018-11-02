import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { User } from '../../classes/user';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private _mobileQueryListener: () => void;

    public mobileQuery: MediaQueryList;
    public admin: User;
    public avatarPlaceholder = 'assets/img/avatar-placeholder.png';

    public navigation = [
        {
            title: 'Requests from riders',
            link: ['/riders', 'requests']
        },
        {
            title: 'Requests from drivers',
            link: ['/drivers', 'requests']
        },
        {
            title: 'List of drivers',
            link: ['/drivers']
        },
        {
            title: 'List of riders',
            link: ['/riders']
        },
        {
            title: 'List of update requests',
            link: ['/riders', 'update-requests']
        },
        {
            title: 'Fare management',
            link: ['/fares', 'management']
        },
        {
            title: 'Settings',
            link: ['/settings']
        }
    ];

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private media: MediaMatcher,
                private sessionService: SessionService,
                private authService: AuthService,
                private router: Router) {
        this.mobileQuery = media.matchMedia('(max-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

        // obtain admin data
        this.admin = this.sessionService.getCurrentUserInfo();
    }

    ngOnInit() {
    }

    public logout(): void {
        this.authService.logout().subscribe(() => {
            this.sessionService.endSession();
            this.router.navigate(['/sign-in']);
        });
    }

}
