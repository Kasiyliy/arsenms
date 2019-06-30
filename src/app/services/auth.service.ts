import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastService} from './toast.service';
import {UserService} from './user.service';
import * as jwt_decode from 'jwt-decode';
import {environment} from '../../environments/environment';
import {User} from '../shared/models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public authorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient,
                private router: Router,
                private toastService: ToastService,
                private userService: UserService) {
    }


    authorize = (perf) => {
        this.authorized.next(true);
        const token = perf;
        const payload = jwt_decode(token);
        localStorage.setItem(environment.apiToken, token);
        this.toastService.presentInfoToast('Авторизовано');
        this.router.navigate(['/']);
    };

    authFail = () => {
        this.toastService.presentDangerToast('Invalid login or password');
    };

    login(email: string, password: string): any {
        return this.http.post(environment.apiUrl + '/api/login', {email, password});
    }


    register(user: User) {
        return this.userService.save(user);
    }

    checkThenRedirect() {
        if (!this.validateToken() || !localStorage.getItem(environment.apiToken)) {
            this.toastService.presentDangerToast('Нужно авторизоваться!');
            this.router.navigate(['/auth']);
        }
    }

    isAuthorized() {
        if (!localStorage.getItem(environment.apiToken)) {
            return false;
        } else {
            return true;
        }
    }


    checkAvailability(): boolean {
        const auth = localStorage.getItem(environment.apiToken);
        return !!auth;
    }

    removeToken() {
        localStorage.removeItem(environment.apiToken);
    }

    removeAll() {
        this.removeToken();
    }


    getToken() {
        return localStorage.getItem(environment.apiToken);
    }


    validateToken() {
        if (localStorage.getItem(environment.apiToken)) {

            let httpParams = new HttpParams();
            httpParams = httpParams.append('token', localStorage.getItem(environment.apiToken));
            this.http.get(environment.apiUrl + '/authentication/validate', {
                params: httpParams,
                responseType: 'text'
            }).toPromise().then(resp => {
                if (resp !== 'OK') {
                    localStorage.clear();
                    this.authorized.next(false);
                }
            }, err => {
                localStorage.clear();
                this.authorized.next(false);
            });
            this.authorized.next(true);
        } else {
            this.authorized.next(false);
        }
        return this.authorized;
    }


    public logout() {
        this.authorized.next(false);
        localStorage.clear();
        this.toastService.presentInfoToast('Вы вышли из системы');
        this.router.navigate(['/auth']);
    }

    // getMyRole() {
    //
    //     if (!this.getMyApi()) {
    //         return null;
    //     }
    //     const base64Url = this.getMyApi().split('.')[1];
    //     const base64 = base64Url.replace('-', '+').replace('_', '/');
    //     return (JSON.parse(window.atob(base64))).role;
    // }

    getMyUsername() {

        if (!this.getMyApi()) {
            return null;
        }

        const base64Url = this.getMyApi().split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return (JSON.parse(window.atob(base64))).sub;
    }

    getMyApi() {
        return localStorage.getItem(environment.apiToken);
    }
}
