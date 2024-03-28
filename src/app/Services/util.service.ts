import { Injectable } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  isLoading: boolean = false;
  constructor(
    private toster: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl:NavController
  ) {}


  // ********************** Toster Start ******************** //
  async errorToast(msg: string, duration?: number) {
    const tost = await this.toster.create({
      message: msg,
      color: 'danger',
      duration: duration ? duration : 1500,
    });
    tost.present();
  }

  async successToast(msg: string, duration?: number) {
    const toast = await this.toster.create({
      message: msg,
      color: 'success',
      duration: duration ? duration : 1500,
    });
    toast.present();
  }

  async warnToast(msg: string, duration?: number) {
    const toast = await this.toster.create({
      message: msg,
      color: 'warning',
      duration: duration ? duration : 1500,
      animated: true,
    });
    toast.present();
  }

  // ********************** Toster End ******************** //
  // ********************** loading Start ******************** //

  async show(msg?) {
    this.isLoading = true;
    return await this.loadingCtrl
      .create({
        message: msg,
        spinner: 'bubbles',
      })
      .then((a) => {
        a.present().then(() => {
          //console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  async hide() {
    this.isLoading = false;
    return await this.loadingCtrl
      .dismiss()
      .then(() => console.log('dismissed'));
  }

  // ********************** loading End ******************** //


  apiErrorHandler(err) {
    // console.log('Error got in service =>', err)
    if (err && err.status === 401 && err.error.error) {
      this.errorToast(err.error.error);
      this.navCtrl.navigateRoot('/login');
      return false;
    }
    if (err && err.status === 500 && err.error.error) {
      this.errorToast(err.error.error);
      return false;
    }
    if (err.status === -1) {
      this.errorToast('Failed To Connect With Server');
    } else if (err.status === 401) {
      this.errorToast('Unauthorized Request!');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.navCtrl.navigateRoot('/login');
    } else if (err.status === 500) {
      this.errorToast('Somethimg Went Wrong');
    } else if (err.status === 422 && err.error.error) {
      this.errorToast(err.error.error);
    } else {
      this.errorToast('Something went wrong');
    }
    return false;

  }

}
