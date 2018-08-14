import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { NgForm } from '../../../node_modules/@angular/forms';

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  userEmail: string = '';
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private alertCtrl: AlertController) {
  }

  /* ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  } */

  resetPasswordConfirmation() {
    let alert = this.alertCtrl.create({
      title: 'Solicitação de senha enviada!',
      buttons: ['OK']
    });
    alert.present();
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

  resetPassword() {
    if (this.form.form.valid) {

      this.authService.resetPassword(this.userEmail)
        .then(() => {
          this.resetPasswordConfirmation();
          this.navCtrl.pop();
        })
        .catch((error: any) => {
          if (error.code == 'auth/invalid-email') {
            this.invalidEmailAlert();
          } else if (error.code == 'auth/user-not-found') {
            this.userNotFoundAlert();
          }
        })
    }
  }
}
