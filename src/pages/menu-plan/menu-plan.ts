import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlanProvider } from '../../providers/plan/plan';
import { EvaluacionPage } from '../evaluacion/evaluacion';
import { CouchFeedProvider } from '../../providers/couch-feed/couch-feed';

/**
 * Generated class for the MenuPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-plan',
  templateUrl: 'menu-plan.html',
})
export class MenuPlanPage {
  myInput = '';
  nRes: number = 16;
  allItems: any = [];
  realItems: any = [];
  todos: any;
  paciente;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public couchDbFeed: CouchFeedProvider,
  public planProvider: PlanProvider) {
   this.paciente = this.navParams.get('Paciente');
   console.log(this.paciente);
  }

  ionViewDidLoad() {
    this.planProvider.getPlanesDocs().then( (data) => {
      console.log(data);
      this.todos = data;
      this.realItems = (this.todos as any[]).slice(0, this.nRes);
    });
  }

  goToEvaluacion(plan){
    this.navCtrl.push(EvaluacionPage, {Plan: plan, Paciente: this.paciente});
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
