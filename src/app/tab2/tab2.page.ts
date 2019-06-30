import {Component} from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {Platform} from '@ionic/angular';
import {ToastService} from '../services/toast.service';
import {Deal} from '../shared/models/deal';
import {UserService} from '../services/user.service';
import {DealTypes} from '../shared/models/deal-types';
import {DealService} from '../services/deal.service';
import {User} from '../shared/models/user';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    isOn = true;
    currentUser: User;

    constructor(
        private platform: Platform,
        private toastService: ToastService,
        private qrScanner: QRScanner,
        private userService: UserService,
        private dealService: DealService,
    ) {
        this.userService.currentUser().subscribe(perf => {
            this.currentUser = perf.success;
        });
    }

    startScanner() {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {

                    this.isOn = true;
                    this.toastService.presentDarkToast('Started to scan!');
                    const scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        const deal = new Deal();
                        deal.receiver_id = parseInt(text, 10);
                        deal.sender_id = this.currentUser.id;
                        deal.type = DealTypes.PURCHASE;
                        deal.amount = 2000;
                        deal.password = '11223344';
                        this.dealService.purchase(deal).subscribe(p => {
                            this.toastService.presentSuccessToast(p.success);
                        });
                        this.qrScanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning
                    });

                    this.qrScanner.show().then();


                } else if (status.denied) {
                    this.qrScanner.openSettings();
                } else {
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }

    closeQr() {
        this.qrScanner.destroy();
    }
}
