import {Component} from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {AlertController, Platform} from '@ionic/angular';
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
        private alertController: AlertController
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
                        this.toastService.presentInfoToast(text);
                        this.presentAlertPrompt(parseInt(text, 10));
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

    async presentAlertPrompt(id) {
        const alert = await this.alertController.create({
            header: 'Make transaction!',
            inputs: [
                {
                    name: 'price',
                    type: 'number',
                    placeholder: 'Enter amount:'
                },
                {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Enter password:'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (data) => {
                        const deal = new Deal();
                        deal.receiver_id = id;
                        deal.sender_id = this.currentUser.id;
                        deal.type = DealTypes.PURCHASE;
                        deal.amount = data.price;
                        deal.password = data.password;
                        this.userService.currentUser().subscribe(perf => {
                            this.currentUser = perf.success;

                            if (this.currentUser.balance - parseInt(data.price, 10) >= 0) {
                                this.dealService.purchase(deal).subscribe(p => {
                                    this.toastService.presentDarkToast('Your transaction is success!');
                                }, error => {
                                    this.toastService.presentDangerToast('Error while making a transaction!');
                                });
                            } else {
                                this.toastService.presentDangerToast('Not enough balance!');
                            }
                        });
                    }
                }
            ]
        });

        await alert.present();
    }
}
