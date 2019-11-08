import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarPacientePage } from './editar-paciente';

@NgModule({
  declarations: [
    EditarPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(EditarPacientePage),
  ],
})
export class EditarPacientePageModule {}
