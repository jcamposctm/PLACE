import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Tabs } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {AgregarPacientePage} from '../pages/agregar-paciente/agregar-paciente';

//Plugins 
import {SQLite} from '@ionic-native/sqlite';
import { StorageProvider } from '../providers/storage/storage';
import { SqlApiProvider } from '../providers/sql-api/sql-api';
import { RegistrarPage } from '../pages/registrar/registrar';
import { PlanProvider } from '../providers/plan/plan';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PlanesPage } from '../pages/planes/planes';
import { IndicadorPage } from '../pages/indicador/indicador';
import { TabsPage } from '../pages/tabs/tabs';
import { EditarPacientePage } from '../pages/editar-paciente/editar-paciente';
import { MenuPlanPage } from '../pages/menu-plan/menu-plan';
import { EvaluacionPage } from '../pages/evaluacion/evaluacion';
import { HistorialPage } from '../pages/historial/historial';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { HistorialEvaluacionPage } from '../pages/historial-evaluacion/historial-evaluacion';
import { HistorialProvider } from '../providers/historial/historial';
import { Firebase } from '@ionic-native/firebase';
import { CouchFeedProvider } from '../providers/couch-feed/couch-feed';
import { HistorialPacientePage } from '../pages/historial-paciente/historial-paciente';

//Providers

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    AgregarPacientePage,
    PlanesPage,
    IndicadorPage,
    EditarPacientePage,
    MenuPlanPage,
    EvaluacionPage,
    HistorialPage,
    ResetPasswordPage,
    HistorialEvaluacionPage,
    HistorialPacientePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    AgregarPacientePage,
    PlanesPage,
    IndicadorPage,
    EditarPacientePage,
    MenuPlanPage,
    EvaluacionPage,
    HistorialPage,
    ResetPasswordPage,
    HistorialEvaluacionPage,
    HistorialPacientePage
  ],
  providers: [
    StatusBar,
    SQLite,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Firebase,
    StorageProvider,
    SqlApiProvider,
    PlanProvider,
    FirebaseProvider,
    HistorialProvider,
    CouchFeedProvider
  ]
})
export class AppModule {}
