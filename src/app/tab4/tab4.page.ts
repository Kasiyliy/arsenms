import {AfterContentInit, Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../shared/models/user';
import {FormBuilder} from '@angular/forms';
import {ToastService} from '../services/toast.service';
import {mergeMap} from 'rxjs/operators';
import {DealService} from '../services/deal.service';
import {Deal} from '../shared/models/deal';

@Component({
    selector: 'app-tab4',
    templateUrl: 'tab4.page.html',
    styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit, AfterContentInit {

    public now: Date = new Date();
    user: User;
    deals: Deal[] = [];

    constructor(private userService: UserService,
                private dealService: DealService,
                private toastService: ToastService
    ) {

    }

    loading = false;

    ngOnInit() {
        this.loading = true;
        this.fetchAll();

    }

    fetchAll() {

        this.userService.currentUser().pipe(mergeMap(perf => {
            this.user = perf.success;
            return this.dealService.getMyTransactions(this.user.id);
        })).subscribe(perf => {
            this.deals = perf.success.deals;
            this.loading = false;
        }, err => {
            this.toastService.presentDangerToast('Information fetching error!');
            this.loading = false;
        });

    }

    ngAfterContentInit(): void {
        this.fetchAll();
        console.log('initiated');
    }


}
