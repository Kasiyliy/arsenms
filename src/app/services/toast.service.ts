import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastr: ToastController) {
    }

    async presentToast() {
        const toast = await this.toastr.create({
            message: 'Your settings have been saved.',
            duration: 2000,
            color: 'primary'
        });
        toast.present();
    }

    async presentInfoToast(message: string) {
        const toast = await this.toastr.create({
            message,
            showCloseButton: true,
            duration: 2000,
            position: 'top',
            closeButtonText: 'Done',
            color: 'primary'
        });
        toast.present();
    }

    async presentDangerToast(message: string) {
        const toast = await this.toastr.create({
            message,
            showCloseButton: true,
            duration: 2000,
            position: 'top',
            closeButtonText: 'Done',
            color: 'danger'
        });
        toast.present();
    }



    async presentDefaultToast(message: string) {
        const toast = await this.toastr.create({
            message,
            showCloseButton: true,
            duration: 2000,
            position: 'top',
            closeButtonText: 'Done',
            color: 'default'
        });
        toast.present();
    }


    async presentSuccessToast(message: string) {
        const toast = await this.toastr.create({
            message,
            showCloseButton: true,
            duration: 2000,
            position: 'top',
            closeButtonText: 'Done',
            color: 'success'
        });
        toast.present();
    }


    async presentWarningToast(message: string) {
        const toast = await this.toastr.create({
            message,
            showCloseButton: true,
            duration: 2000,
            position: 'top',
            closeButtonText: 'Done',
            color: 'warning'
        });
        toast.present();
    }

    async presentDarkToast(message: string) {
        const toast = await this.toastr.create({
            message,
            showCloseButton: true,
            duration: 2000,
            position: 'top',
            closeButtonText: 'Done',
            color: 'dark'
        });
        toast.present();
    }
}
