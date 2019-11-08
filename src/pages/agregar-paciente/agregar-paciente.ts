import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanProvider } from '../../providers/plan/plan';
import { StorageProvider } from '../../providers/storage/storage';


@IonicPage()
@Component({
  selector: 'page-agregar-paciente',
  templateUrl: 'agregar-paciente.html',
})
export class AgregarPacientePage {
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
  email;

  paciente = {
    Email: '',
    Nombre: '',
    Apellido: '',
    Direccion: '',
    Telefono: 0,
    key: '',
    usuario: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loginBuild: FormBuilder,
    public Plan: PlanProvider,
    public storage: StorageProvider,
    public toastCtrl: ToastController) {
    this.loginForm = this.loginBuild.group({
      Email: ['',],
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Direccion: ['', Validators.required],
      Telefono: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarPacientePage');
    this.getEmail();
  }

  agregarPaciente() {
    if (this.loginForm.valid) {
      this.paciente = {
        Nombre: this.loginForm.value.Nombre,
        Apellido: this.loginForm.value.Apellido,
        Email: this.loginForm.value.Email,
        Direccion: this.loginForm.value.Direccion,
        Telefono: this.loginForm.value.Telefono,
        usuario: this.email,
        key: 'paciente'
      };
      this.Plan.createTodo(this.paciente);
      this.showToast();
      this.navCtrl.pop();
    }
    else {
      console.log('No has llenado correctamente los campos');
    }
  }

  getEmail() {
    this.storage.getStorage()
      .then(data => {
        console.log(data);
        this.email = data;
      })
  }

  showToast() {
    let toast = this.toastCtrl.create({
      message: 'Paciente Agregado',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

}
