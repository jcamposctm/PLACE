import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PlanProvider } from '../../providers/plan/plan';

/**
 * Generated class for the EditarPacientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-paciente',
  templateUrl: 'editar-paciente.html',
})
export class EditarPacientePage {
  paciente: any;
  passwordValid: Boolean = false;
  passwordTouched: Boolean = false;
  password2Valid: Boolean = false;
  password2Touched: Boolean = false;
  emailTouched: Boolean = false;
  nombreTouched: Boolean = false;
  apellidoTouched: Boolean = false;
  direccionTouched: Boolean = false;
  telefonoTouched: Boolean = false;
  nombreValido = false;
  apellidoValido = false;
  direccionValido = false;
  telefonoValido = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public planProvider: PlanProvider,
  public toastCtrl: ToastController) {
    this.paciente = this.navParams.get('Paciente');
    console.log(this.paciente);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPacientePage');
  }

  editarPaciente(){
    this.planProvider.updateTodo(this.paciente)
    .then( () => {
      this.showToast();
      this.navCtrl.pop();
    });
  }

  nombreKeyup(){
    if(this.paciente.Nombre != null){
      if((this.paciente.Nombre as String).trim() == ""){
        this.nombreValido = false;
      }else{
        this.nombreValido = true;
      }
    }else{
      this.nombreTouched = false;
    }
  }

  apellidoKeyup(){
    if(this.paciente.Apellido != null){
      if((this.paciente.Apellido as String).trim() == ""){
        this.apellidoValido = false;
      }else{
        this.apellidoValido = true;
      }
    }else{
      this.apellidoValido = false;
    }
  }

  direccionKeyup(){
    if(this.paciente.Direccion != null){
      if((this.paciente.Direccion as String).trim() == ""){
        this.direccionValido = false;
      }else{
        this.direccionValido = true;
      }
    }else{
      this.direccionValido = false;
    }
  }

  telefonoKeyup(){
    if(this.paciente.Telefono != null){
      if((this.paciente.Telefono as String).trim() == ""){
        this.telefonoValido = false;
      }else{
        this.telefonoValido = true;
      }
    }else{
      this.telefonoValido = false;
    }
  }

  showToast(){
    let toast = this.toastCtrl.create({
      message: 'Informacion Actualizada',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

}
