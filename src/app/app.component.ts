import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { StorageProvider } from '../providers/storage/storage';
import { PlanProvider } from '../providers/plan/plan';
import { PlanesPage } from '../pages/planes/planes';
import firebase from 'firebase';
import { firebaseConfig } from './config';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { SqlApiProvider } from '../providers/sql-api/sql-api';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  email;

  rootPage: any = '';
  @ViewChild('content') nav: NavController

  paginas: Array<any> = [
    {
      icon: 'ios-home-outline',
      titulo: 'Inicio',
      componente: HomePage
    },
    {
      icon: 'ios-list-box-outline',
      titulo: 'Planes',
      componente: PlanesPage
    },
    {
      icon: 'ios-log-out-outline',
      titulo: 'Cerrar Sesion',
      componente: LoginPage
    }
  ]

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public events: Events,
    public sqlApi: SqlApiProvider,
    public storage: StorageProvider,
    public fbProvider: FirebaseProvider,
    public plan: PlanProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.inicializarFirebase();
      this.checkStorage();
      this.sqlApi.cargarSQLite();
    });
    this.eventEmail();
  }

  inicializarFirebase() {
    firebase.initializeApp(firebaseConfig.conf);
  }

  eventEmail() {
    this.events.subscribe('email', email => {
      this.email = email;
    });
  }

  public checkStorage() {
    this.storage.waitForStorage()
      .then((data) => {
        if (data == null) {
          this.rootPage = LoginPage;
        }
        else {
          this.email = data;
          this.rootPage = HomePage;
        }
      });
  }

  openPage(pagina: any) {
    if (pagina.titulo == 'Cerrar Sesion') {
      this.nav.setRoot(LoginPage);
      this.storage.deleteStorage();
      this.fbProvider.signOut()
    }
    else {
      this.rootPage = pagina.componente;
    }
  }
}

