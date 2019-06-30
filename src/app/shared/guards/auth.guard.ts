import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate = () => {
        if (localStorage.getItem(environment.apiToken)) {
            return true;
        } else {
            this.router.navigate(['/auth']);
            return false;
        }
    }


}
