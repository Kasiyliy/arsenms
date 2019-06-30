import {Component, OnInit} from '@angular/core';
import {ToastService} from '../services/toast.service';
import {UserService} from '../services/user.service';
import {User} from '../shared/models/user';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    currentUser: User;

    constructor(private toastService: ToastService,
                private userService: UserService) {

    }

    fetchAll() {
        this.userService.currentUser().subscribe(perf => {
            this.currentUser = perf.success;
            console.log(this.currentUser);
        });
    }

    ngOnInit(): void {
        this.fetchAll();
    }


}
