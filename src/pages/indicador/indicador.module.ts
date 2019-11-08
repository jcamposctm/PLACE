import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndicadorPage } from './indicador';

@NgModule({
  declarations: [
    IndicadorPage,
  ],
  imports: [
    IonicPageModule.forChild(IndicadorPage),
  ],
})
export class IndicadorPageModule {}
