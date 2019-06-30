import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../shared/models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    public now: Date = new Date();
    user: User;

    constructor(private userService: UserService,
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
        });

    }


}
