import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    loading = false;

    constructor(
        private  authService: AuthService,
        private router: Router,
        private builder: FormBuilder) {
    }

    loginForm: FormGroup;

    ngOnInit() {
        this.authService.removeAll();
        this.loginForm = this.builder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required]
        });


        this.router.events.subscribe(perf => {
            this.loginForm.reset();
        });
    }

    login() {
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;
        this.loading = true;
        this.authService.login(email, password).subscribe(perf => {
            this.loading = false;
            this.loginForm.reset();
            const token = perf.success.token;
            this.authService.authorize(token);
        }, err => {
            this.loading = false;
            this.authService.authFail();
        });
    }


}
