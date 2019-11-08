import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlanProvider } from '../../providers/plan/plan';


@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {
  _id: any;
  evaluaciones: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public planProvider: PlanProvider) {
    this._id = this.navParams.get('_id');
    console.log(this._id);
  }

  closeModal() {
    this.navCtrl.pop();
  }

  range(n) {
    return new Array(n);
  }

  ionViewDidLoad() {
    this.planProvider.getPlanesEvaluacion(this._id)
    .then( data => {
      console.log(data);
    });
  }

}
