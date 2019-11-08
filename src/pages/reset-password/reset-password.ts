import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  email = "karencampos@gmail.com";
  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fbProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  sendResetPassword() {
    if (this.email != "") {
      this.showLoading();
      this.fbProvider.resetPassword(this.email)
      .then( () => {
        this.loading.dismiss();
        this.showAlert('Verifica tu correo para reestablecer tu contraseña');
      })
      .catch( () => {
        this.loading.dismiss();
        this.showAlert('El correo ingresado no es valido');
      })
    }
    else {
      this.showAlert('No has ingresado ningun correo');
    }
  }

  showAlert(mensaje){
    let alert = this.alertCtrl.create({
      subTitle: mensaje
    });
    alert.present();
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Enviando...'
    });

    this.loading.present();
  }

}
