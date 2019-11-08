import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SqlApiProvider } from '../../providers/sql-api/sql-api';
import { HomePage } from '../home/home';
import { StorageProvider } from '../../providers/storage/storage';
import { LoginPage } from '../login/login';
import { PlanProvider } from '../../providers/plan/plan';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ResetPasswordPage } from '../reset-password/reset-password';

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html'
})
export class RegistrarPage {
  passwordValid: Boolean = false;
  passwordTouched: Boolean = false;
  password2Valid: Boolean = false;
  password2Touched: Boolean = false;
  emailTouched: Boolean = false;
  nombreTouched: Boolean = false;
  apellidoTouched: Boolean = false;
  direccionTouched: Boolean = false;
  telefonoTouched: Boolean = false;
  loginForm: FormGroup;
  validForm: Boolean = false;
  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuild: FormBuilder,
    public alerta: AlertController,
    public fbProvider: FirebaseProvider,
    public planProvider: PlanProvider,
    public storage: StorageProvider) {
    this.loginForm = this.formBuild.group({
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Telefono: ['', Validators.required],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      Password2: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  password2Keyup() {
    if (this.loginForm.value.Password! === this.loginForm.value.Password2)
      this.password2Valid = true;
    else {
      this.password2Valid = false;
    }
  }

  crearUsuario() {
    this.mostrarLoading();
    let email = this.loginForm.value.Email;
    let password = this.loginForm.value.Password;
    this.fbProvider.signupUser(email, password)
      .then(() => {
        this.mostrarAlerta('Verifica tu cuenta en la dirección de correo \n' +
          'que ingresaste');
          this.loading.dismiss();
          this.navCtrl.setRoot(LoginPage);
      })
      .catch((error) => {
        this.loading.dismiss();
        console.log(error);
        this.mostrarAlerta(error.message);
        this.showToast('Lo sentimos, ha ocurrido un error');
      });

  }

  validarFormulario() {
    if (this.password2Valid && this.loginForm.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  goToReset(){
    this.navCtrl.push(ResetPasswordPage);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  mostrarAlerta(mensaje: string) {
    let alerta = this.alerta.create({
      title: '',
      subTitle: mensaje,
      buttons: ['Ok']
    });
    alerta.present();
  }

  mostrarLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Registrando...',
    });
    this.loading.present();
  }

  showToast(mensaje){
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: mensaje
    });

    toast.present();
  }

}
