import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistorialProvider } from '../../providers/historial/historial';

@IonicPage()
@Component({
  selector: 'page-historial-paciente',
  templateUrl: 'historial-paciente.html',
})
export class HistorialPacientePage {
  plan;
  planes;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public historialProvider: HistorialProvider) {
      this.plan = this.navParams.get('plan');
      console.log(this.plan);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPacientePage');
    this.getMangoQuery(this.plan);
  }

  getMangoQuery(plan){
    this.historialProvider.mangoQuery(plan.Indicador, plan.Resultado)
    .then( data => {
      console.log(data);
      this.planes = data['docs'];
    })
  }

}
