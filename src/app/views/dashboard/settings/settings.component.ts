import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminsService } from '../../../services/admins.service';
import { Admin } from '../../../classes/admin';
import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss', '../dashboard-shared.scss']
})
export class SettingsComponent implements OnInit {
    public admin: Admin;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private adminService: AdminsService,
        private sessionService: SessionService,
        private authService: AuthService) {
    }

    public logout(): void {
        this.authService.logout().subscribe(() => {
            this.sessionService.endSession();
            this.router.navigate(['/sign-in']);
        });
    }

    ngOnInit() {
        this.adminService
            .get()
            .subscribe(admin => {
                this.admin = admin;
            });
    }

}
