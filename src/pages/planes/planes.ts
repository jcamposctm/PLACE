import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PlanProvider } from '../../providers/plan/plan';
import { IndicadorPage } from '../indicador/indicador';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-planes',
  templateUrl: 'planes.html',
})

export class PlanesPage {
  myInput = "";
  nRes: number = 16;
  allItems: any = [];
  realItems: any = [];
  
  todos: Pick<any, "Nombre"| "Descripcion" | '_id'>[];
  objtoPrueba: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public plan: PlanProvider) {
  }

  ionViewDidLoad() {
    this.plan.getTodos().then((data) => {
      //this.todos = this.destroy(data, ['Nombre', 'Descripcion']);
      this.todos = this.destroy(data);
      this.realItems = (this.todos as any[]).slice(0, this.nRes);
      console.log(this.todos);
    });
  }

  goToIndicador() {
    this.navCtrl.push(IndicadorPage);
  }

  destroy(data) {
    return _.map(data, function (elm) {
      return _.pick(elm, 'Nombre', 'Descripcion', 'version','_id')
    });
  };
  
  alerta(id){
    let alert = this.alertCtrl.create({
      title: 'PLACE',
      subTitle: '¿Deseas descargar este plan?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Si',
          handler: () => {
            this.plan.getPlanNube(id)
            .then( data => {
             this.mostrarAlerta('PLAN Descargado');
              this.plan.comprobarPlan(data);
            });
          }
        }
      ]
    });
    alert.present();
  }

  mostrarAlerta(mensaje){
    let alert = this.alertCtrl.create({
      title: "PLACE",
      subTitle: mensaje,
      buttons: ['Ok']
    });
    alert.present();
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
