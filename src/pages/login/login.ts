import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { User } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { NgForm } from '../../../node_modules/@angular/forms';
import { SignupPage } from '../signup/signup';
import { ResetpasswordPage } from '../resetpassword/resetpassword';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private alertCtrl: AlertController,
    public fb: Facebook) {
  }

  createAccount() {
    this.navCtrl.push(SignupPage)
  }

  resetPassword() {
    this.navCtrl.push(ResetpasswordPage)
  }

  invalidEmailAlert() {
    let alert = this.alertCtrl.create({
      title: 'Email inválido.',
      buttons: ['OK']
    });
    alert.present();
  }

  userNotFoundAlert() {
    let alert = this.alertCtrl.create({
      title: 'Usuário não encontrado.',
      buttons: ['OK']
    });
    alert.present();
  }

  userDisabledAlert() {
    let alert = this.alertCtrl.create({
      title: 'Usuário desativado.',
      buttons: ['OK']
    });
    alert.present();
  }

  wrongPasswordAlert() {
    let alert = this.alertCtrl.create({
      title: 'Senha inválida.',
      buttons: ['OK']
    });
    alert.present();
  }

  signIn() {
    if (this.form.form.valid) {
      this.authService.signIn(this.user)
        .then(() => {
          console.log(this.user)
          this.navCtrl.setRoot(HomePage);
        }).catch((error: any) => {
          if (error.code == 'auth/invalid-email') {
            this.invalidEmailAlert();
          } else if (error.code == 'auth/user-not-found') {
            this.userNotFoundAlert();
          } else if (error.code == 'auth/user-disabled') {
            this.userDisabledAlert();
          } else if (error.code == 'auth/wrong-password') {
            this.wrongPasswordAlert();
          }
        })
    }
  }

  //Login com o facebook

  loginAction() {
    // Login with permissions
    this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
      .then((res: FacebookLoginResponse) => {

        // The connection was successful
        if (res.status == "connected") {

          // Get user ID and Token
          var fb_id = res.authResponse.userID;
          var fb_token = res.authResponse.accessToken;

          // Get user infos from the API
          this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {

            // Get the connected user details
            var gender = user.gender;
            var birthday = user.birthday;
            var name = user.name;
            var email = user.email;

            console.log("=== USER INFOS ===");
            console.log("Gender : " + gender);
            console.log("Birthday : " + birthday);
            console.log("Name : " + name);
            console.log("Email : " + email);

            // => Open user session and redirect to the next page
            this.navCtrl.setRoot(HomePage);
          });

        }
        // An error occurred while loging-in
        else {

          console.log("An error occurred...");

        }

      })
      .catch((e) => {
        console.log('Error logging into Facebook', e);
      });
  }
}
