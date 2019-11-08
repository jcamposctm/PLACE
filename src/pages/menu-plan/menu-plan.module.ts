import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPlanPage } from './menu-plan';

@NgModule({
  declarations: [
    MenuPlanPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuPlanPage),
  ],
})
export class MenuPlanPageModule {}
