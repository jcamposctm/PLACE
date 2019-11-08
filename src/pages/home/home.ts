import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, NavParams, ModalController, MenuController } from 'ionic-angular';
import { PlanProvider } from '../../providers/plan/plan';
import { AgregarPacientePage } from '../agregar-paciente/agregar-paciente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanesPage } from '../planes/planes';
import { EditarPacientePage } from '../editar-paciente/editar-paciente';
import { MenuPlanPageModule } from '../menu-plan/menu-plan.module';
import { MenuPlanPage } from '../menu-plan/menu-plan';
import { HistorialPage } from '../historial/historial';
import { StorageProvider } from '../../providers/storage/storage';
import { HistorialEvaluacionPage } from '../historial-evaluacion/historial-evaluacion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email;
  persona;
  todos: any;
  loginForm: FormGroup;
  myInput = "";
  nRes: number = 16;
  allItems: any = [];
  realItems: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public plan: PlanProvider,
    public storage: StorageProvider,
    public menuCtrl: MenuController,
    public loginBuild: FormBuilder,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
      this.cargarFormulario();
      this.menuCtrl.enable(true);
  }

  getEmail(){
    this.storage.getStorage()
    .then( data => {
      console.log(data);
      this.email = data;
      this.obtenerPlanes();
    })
  }

  cargarFormulario(){
    this.loginForm = this.loginBuild.group({
      PrimerNombre: ['', Validators.required],
      PrimerApellido: ['', Validators.required],
      SegundoNombre: ['', Validators.required],
      SegundoApellido: ['', Validators.required],
      Edad: ['', Validators.required],
      Direccion: ['', Validators.required],
      Telefono: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.getEmail();
    //this.plan.elimninarDB();
    //this.obtenerPlanes();
    //this.getEmail();
  }

  obtenerPlanes() {
    this.plan.getTodosDocs(this.email).then((data) => {
      console.log(data);
      this.todos = data;
      this.realItems =this.todos;
    });
   //this.plan.elimninarDB();
  }

  goToEditar(paciente) {
    this.navCtrl.push(EditarPacientePage, { Paciente: paciente })
  }

  showAlert(todo: any) {
    let alert = this.alertCtrl.create({
      title: 'Eliminar',
      subTitle: '¿Desea eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.plan.deleteTodo(todo);
            this.showToast();
            this.obtenerPlanes();
          }
        }
      ]
    });
    alert.present();
  }

  goToHistorial(todo){
    let myModal = this.modalCtrl.create(HistorialEvaluacionPage, {_id : todo._id});
    myModal.present();
  }

  goToPlanes(paciente) {
    console.log(paciente);
    this.navCtrl.push(MenuPlanPage, { Paciente: paciente });
  }

  deleteTodo(todo) {
    this.showAlert(todo);
  }

  crearPaciente() {
    this.navCtrl.push(AgregarPacientePage);
  }

  showToast() {
    let toast = this.toastCtrl.create({
      message: 'Paciente Eliminado',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  onInput(event) {
    if (event.srcElement.value != "" && event.srcElement.value != null) {
      let str = (event.srcElement.value as string);
      this.realItems = (this.todos as any[]).filter(
        f => (f.Nombre as String).toUpperCase().includes(str.toUpperCase())
      ).slice(0, this.nRes);
    }
    else
      this.realItems = (this.todos as any[]).slice(0, this.nRes);
  }
  onCancel() {
    this.realItems = (this.todos as any[]).slice(0, this.nRes);
  }
  onClear() {
    this.realItems = (this.todos as any[]).slice(0, this.nRes);
  }

  
}




