import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {
  public usuario: string;

  constructor(public storage: Storage) {
    //this.getStorage();
  }

  getStorage() {
    return new Promise(resolve => {
      this.storage.get('usuario').then(data => {
        resolve(data);
        this.usuario = data;
      });
    });

  }

  waitForStorage() {
    return new Promise(resolve => {
      this.storage.ready()
        .then(() => {
          this.storage.get('usuario')
            .then(data => {
              this.usuario = data;
              resolve(data)
            });
        });
    });
  }

  setStorage(usuario: string) {
    this.storage.set('usuario', usuario);
  }

  deleteStorage() {
    this.storage.remove('usuario')
      .then(() => {
        this.usuario = null;
      })
  }

}
