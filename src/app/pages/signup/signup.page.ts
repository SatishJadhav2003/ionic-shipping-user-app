import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
import { UtilService } from 'src/app/Services/util.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private util: UtilService,
    private api: ApiService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
  async onSignUp() {
    try {
      if (this.signupForm.invalid) {
        this.util.warnToast(
          'Please fill out all required fields correctly',
          1500
        );
        return;
      }
      this.util.show();
      const res = await this.api.post('api/signup', this.signupForm.value);
      localStorage.setItem('token', res['token']);
      localStorage.setItem('user', JSON.stringify(res['user']));
      // Remove this settimeout line after integrating with backend this is for prevent error

      setTimeout(() => {
        this.util.hide();
        this.util.successToast('Sign Up Success', 700);
        localStorage.setItem('isLoggedIn', 'true');
        this.navCtrl.navigateRoot('home');
      }, 300);
    } catch (error) {
      this.util.hide();
      console.log(error);
      this.util.apiErrorHandler(error);
    }
  }
}
