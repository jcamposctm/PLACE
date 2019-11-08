import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorialPacientePage } from './historial-paciente';

@NgModule({
  declarations: [
    HistorialPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialPacientePage),
  ],
})
export class HistorialPacientePageModule {}
