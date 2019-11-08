import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarPacientePage } from './agregar-paciente';

@NgModule({
  declarations: [
    AgregarPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarPacientePage),
  ],
})
export class AgregarPacientePageModule {}
