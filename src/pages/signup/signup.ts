import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { NgForm } from '../../../node_modules/@angular/forms';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private alertCtrl: AlertController) {
  }  

  createAccount() {
    if (this.form.form.valid) {
      this.authService.createUser(this.user)
        .then(() => {
          this.SucessfulSignupAlert();          
          this.navCtrl.setRoot(HomePage)
        }).catch((error: any) => {
          if (error.code == 'auth/email-already-in-use') {
            this.SameEmailAlert();
          } else if (error.code == 'auth/invalid-email') {
            this.InvalidEmailAlert();
          }else if (error.code == 'auth/weak-password'){
            this.WeakPasswordAlert();
          }
        })
    }
  }

  // --------Alertas------------

  SucessfulSignupAlert() {
    let alert = this.alertCtrl.create({
      title: 'Conta criada com sucesso!',
      buttons: ['OK']
    });
    alert.present();
  }

  SameEmailAlert() {
    let alert = this.alertCtrl.create({
      title: 'Email já cadastrado!',
      buttons: ['OK']
    });
    alert.present();
  }

  InvalidEmailAlert() {
    let alert = this.alertCtrl.create({
      title: 'Email inválido.',
      buttons: ['OK']
    });
    alert.present();
  }

  WeakPasswordAlert(){
    let alert = this.alertCtrl.create({
      title: 'A senha precisa ter pelo menos 8 caracteres!',
      buttons: ['OK']
    });
    alert.present();
  }
}
