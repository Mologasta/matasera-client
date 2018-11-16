import { Injectable } from '@angular/core';

import { AppStorage } from '../helpers/app-storage';
import { User } from '../classes/user';
import { SessionModel } from '../interfaces/session.interface';
import { Tokens } from '../interfaces/tokens.interface';
import { BehaviorSubject, Observable } from 'rxjs/index';

const APP_SESSION = 'session';
const APP_USER = 'user';

@Injectable()
export class SessionService {

    private loggedInState: BehaviorSubject<boolean>;
    private sessionStorage = new AppStorage<Tokens>(localStorage, APP_SESSION);
    private userStorage = new AppStorage<User>(localStorage, APP_USER);

    constructor() {
        if (this.sessionStorage.getItem()) {
            this.loggedInState = new BehaviorSubject(true);
        } else {
            this.loggedInState = new BehaviorSubject(false);
        }
    }

    checkLoggedInState(): Observable<boolean> {
        return this.loggedInState.asObservable();
    }

    getLoggedInState(): boolean {
        return this.loggedInState.getValue();
    }

    startSession(session: SessionModel): void {
        this.sessionStorage.setItem(session.credentials);
        this.loggedInState.next(true);
    }

    endSession(): void {
        this.userStorage.removeItem();
        this.sessionStorage.removeItem();
        this.loggedInState.next(false);
    }

    addCurrentUserInfo(user: User): void {
        this.userStorage.setItem(user);
    }

    getCurrentUserInfo(): User {
        return new User(this.userStorage.getItem());
    }

    getCurrentSessionInfo(): Tokens {
        return this.sessionStorage.getItem();
    }

}
