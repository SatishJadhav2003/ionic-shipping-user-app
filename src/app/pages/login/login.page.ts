import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Login from './login.interface';
import { NavController, ToastController } from '@ionic/angular';
import { UtilService } from 'src/app/Services/util.service';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private util: UtilService,
    private api: ApiService,
    private navCtrl: NavController
  ) {}

  async ionViewWillEnter() {
   if(localStorage.getItem('isLoggedIn')==='true')
   {
    this.navCtrl.navigateForward('home')
   }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
  async onLogin() {
    if (
      !this.loginForm.get('email').value ||
      this.loginForm.get('email').invalid
    ) {
      this.util.warnToast('Please enter valid email', 1500);
      return;
    }
    if (
      !this.loginForm.get('password').value ||
      this.loginForm.get('password').invalid
    ) {
      this.util.warnToast('Please enter password', 1500);
      return;
    }
    this.util.show();
    // Login logic
    this.api
      .post('api/login', this.loginForm.value)
      .then(
        (res) => {
          console.log('Login Success');
          localStorage.setItem('token', res['token']);
          localStorage.setItem('user', JSON.stringify(res['user']));
          // Remove this settimeout line after integrating with backend this is for prevent error
          setTimeout(() => {
            this.util.hide();
            this.util.successToast('Login Success', 700);
            localStorage.setItem('isLoggedIn', 'true');
            this.navCtrl.navigateRoot('home');
          }, 500);
        },
        (error) => {
          this.util.hide();
          this.util.apiErrorHandler(error);
        }
      )
      .catch((error) => {
        this.util.hide();
        console.log(error);
        this.util.apiErrorHandler(error);
      });
  }
}
