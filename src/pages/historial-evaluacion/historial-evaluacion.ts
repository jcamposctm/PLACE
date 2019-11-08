import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlanProvider } from '../../providers/plan/plan';
import { HistorialPage } from '../historial/historial';
import { HistorialProvider } from '../../providers/historial/historial';
import { SqlApiProvider } from '../../providers/sql-api/sql-api';
import { HistorialPacientePage } from '../historial-paciente/historial-paciente';

@IonicPage()
@Component({
  selector: 'page-historial-evaluacion',
  templateUrl: 'historial-evaluacion.html',
})
export class HistorialEvaluacionPage {
  myInput = '';
  nRes: number = 16;
  allItems: any = [];
  realItems: any = [];
  todos: any;
  aggregate
  paciente;
  _id;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public historialProvider: HistorialProvider,
  public sqlapi: SqlApiProvider,
  public planProvider: PlanProvider) {
    this._id = this.navParams.get('_id');
  }

  ionViewDidLoad() {
    this.getPlanes();
    this.sqlapi.getEvaluacion(this._id)
    .then( data => {
      this.aggregate = data;
    })
    this.getPacienteById();
    //this.historialProvider.complexQuery();
  }

  getPacienteById()
  {
    this.planProvider.getPacienteById(this._id)
    .then( data => {
     this.paciente = data[0];
    });
  }

  getMangoQuery(plan){
    this.historialProvider.mangoQuery(plan.Indicador, plan.Resultado)
    .then( data => {
      console.log(data);
    })
  }

  closeModal() {
    this.navCtrl.pop();
  }

  getPlanes(){
    this.planProvider.getPlanesDocs().then( (data) => {
      console.log(data);
      this.todos = data;
      this.realItems = (this.todos as any[]).slice(0, this.nRes);
    });
  }

  goToHistorial(){
    let final = {
      
    }
    this.navCtrl.push(HistorialPage)
  }

  goToHistorialPaciente(plan){
    this.navCtrl.push(HistorialPacientePage, { plan: plan})
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
