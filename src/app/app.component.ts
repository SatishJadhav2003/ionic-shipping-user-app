import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private navCtrl: NavController) {
    const intro = localStorage.getItem('intro');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (intro == 'true') {
      if (isLoggedIn == 'true') {
        this.navCtrl.navigateForward('/home');
      } else {
        this.navCtrl.navigateForward('/login');
      }
    } else {
      this.navCtrl.navigateForward('/intro');
    }
  }
}
