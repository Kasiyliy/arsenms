import {AfterContentInit, Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../shared/models/user';
import {FormBuilder} from '@angular/forms';
import {ToastService} from '../services/toast.service';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, AfterContentInit {

    public now: Date = new Date();
    user: User;

    constructor(private userService: UserService,
                private toastService: ToastService,
                private builder: FormBuilder) {

    }

    loading = false;

    ngOnInit() {
        setInterval(() => {
            this.now = new Date();
        });

        this.loading = true;
        this.fetchAll();

    }

    fetchAll = () => {
        this.userService.currentUser().subscribe(perf => {
            this.user = perf.success;
            this.loading = false;
        }, err => {
            this.toastService.presentDangerToast('Information fetching error!');
            this.loading = false;
        });

    };

    ngAfterContentInit(): void {
        this.fetchAll();
        console.log('initiated');
    }


}
