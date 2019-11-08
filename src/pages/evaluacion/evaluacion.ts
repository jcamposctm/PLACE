import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { PlanProvider } from '../../providers/plan/plan';
import { HomePage } from '../home/home';
import { StorageProvider } from '../../providers/storage/storage';
import { SqlApiProvider } from '../..//providers/sql-api/sql-api';


@IonicPage()
@Component({
  selector: 'page-evaluacion',
  templateUrl: 'evaluacion.html',
})
export class EvaluacionPage {
  email;
  plan;
  paciente;
  fecha: Date;
  resul: string = null;
  indi: string = null;
  posicion: number;
  valor: number;
  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: StorageProvider,
    public apiProvider: SqlApiProvider,
    public planProvider: PlanProvider) {
    this.plan = this.navParams.get('Plan');
    console.log(this.plan);
    this.paciente = this.navParams.get('Paciente');
  }

  getEmail() {
    this.storage.getStorage()
      .then(data => {
        console.log(data);
        this.email = data;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvaluacionPage');
    this.getEmail();
  }

  setIndex($event, i) {
    this.resul = null;
    this.posicion = i;
    console.log(this.posicion);
    if (this.plan.Problema.Indicador.length == 0) {
      this.posicion = 0;
    }
  }

  evaluar() {
    if (this.indi == null) {
      this.mostrarAlerta('No has seleccionado ningun indicador');
    }
    else {
      this.mostrarLoading();
      let date = new Date();
      if (this.valor == null) {
        this.valor = 1;
      }
      let evaluacion = {
        indicador: this.indi.trim(),
        //indicadorId = this.
        resultado: this.resul.trim(),
        pacienteId: this.paciente._id,
        calificacion: this.valor,
        fecha: new Date(),
        //fecha: date.getDate() + "/"+(date.getMonth()+1)+"/"+date.getFullYear() + " "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(),
        usuario: this.email,
        key: 'evaluacion'
      }
      this.apiProvider.postEvaluacion(evaluacion);
      this.planProvider.createTodo(evaluacion);
      //this.planProvider.createTodo(indiceEvaluacion);
      this.indi == null;
    }
  }

  showEscalas() {
    if (this.indi == null) {
      this.mostrarAlerta('No has seleccionado ningun indicador');
    }

    else {
      if (!this.plan.Problema.Escala['1']) {
        let alert = this.alertCtrl.create({
          title: 'Escalas de Medicion',
          subTitle: this.plan.Problema.Escala[0].map((x, index) => (index + 1) + '. ' + x).join('<br />'),
          buttons: ['Ok']
        });
        alert.present();
      }
      else {
        console.log(this.indi);
        let alert = this.alertCtrl.create({
          title: 'Escalas de Medicion',
          subTitle: this.plan.Problema.Escala[this.posicion].map((x, index) => (index + 1) + '. ' + x).join('<br />'),
          buttons: ['Ok']
        });
        alert.present();
      }

    }
  }

  showActividades($event) {
    let alert = this.alertCtrl.create({
      title: 'Lista de Actividades',
      //  subTitle: this.plan.Problema.Actividades.map((x, index) => (index+1)+'. '+x).join('<br />'),
      subTitle: this.plan.Problema.Actividades.map((x, index) => (index + 1) + '. ' + x).join('<br />'),
      buttons: ['Ok']
    });
    alert.present();
  }

  mostrarAlerta(mensaje) {
    let alert = this.alertCtrl.create({
      title: "PLACE",
      subTitle: mensaje,
      buttons: ['Ok']
    });
    alert.present();
  }

  mostrarLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Registrando...',
      duration: 3000
    });
    this.loading.present();
    this.loading.dismiss()
      .then(() => {
        this.preguntarSiguiente();
      })
  }

  preguntarSiguiente() {
    this.valor = 1;
    let alert = this.alertCtrl.create({
      title: 'Evaluación Registrada',
      subTitle: '¿Desea seguir evaluando a este paciente?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        },
        {
          text: 'Si',
          role: 'Cancel'
        }
      ]
    });
    alert.present();
  }

}
