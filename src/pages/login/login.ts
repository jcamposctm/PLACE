import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, LoadingController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SqlApiProvider } from '../../providers/sql-api/sql-api';
import { HomePage } from '../home/home';
import { StorageProvider } from '../../providers/storage/storage';
import { RegistrarPage } from '../registrar/registrar';
import { TabsPage } from '../tabs/tabs';
import { PlanProvider } from '../../providers/plan/plan';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ResetPasswordPage } from '../reset-password/reset-password';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  usuario: {
    email: '',
    password: ''
  }
  loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public alerta: AlertController,
    public sqlApi: SqlApiProvider,
    public events: Events,
    public loadingCtrl: LoadingController,
    public fbProvider: FirebaseProvider,
    public menu: MenuController,
    public planProvider: PlanProvider,
    public storage: StorageProvider) {
    this.menu.enable(false);
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  emaillEvento(email) {
    this.events.publish('email', email);
  }

  loguearUsuario() {
    let estado = false;
    if (estado) {
      this.mostrarAlerta('Llene de manera correcta el formulario');
    }
    else {
      this.showLoading();
      this.usuario = {
        email: this.loginForm.value.Email,
        password: this.loginForm.value.Password
      }
      this.fbProvider.loginUser(this.usuario.email, this.usuario.password)
        .then((res) => {
          console.log(res);
          if (res['emailVerified']) {
            this.loading.dismiss();
            this.mostrarAlerta('Sesión iniciada');
            this.emaillEvento(this.usuario.email);
            this.navCtrl.setRoot(HomePage);
            this.storage.setStorage(this.usuario.email);
          }
          else {
            this.loading.dismiss();
            this.mostrarAlerta('Verifica tu cuenta antes de iniciar sesión');
            //this.mostrarAlerta('No se pudo iniciar sesión');
          }
        })
        .catch(error => {
          console.log(error);
          this.loading.dismiss();
          this.mostrarAlerta('Email y/o Contraseña Incorrectos')
        });
    }
  }

  goToRegistrar() {
    this.navCtrl.push(RegistrarPage);
  }

  goToReset() {
    this.navCtrl.push(ResetPasswordPage);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });

    this.loading.present();
  }

  mostrarAlerta(mensaje: string) {
    let alerta = this.alerta.create({
      subTitle: mensaje,
      buttons: ['Ok']
    });
    alerta.present();
  }
}
